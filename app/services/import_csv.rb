# frozen_string_literal: true

class ImportCsv
  require 'csv'

  def initialize(file_path)
    @file_path = file_path
  end

  def import
    row_count = 1
    error_rows = []
    CSV.foreach(@file_path, headers: true) do |row|
      role = Role.find_or_initialize_by(name: row['Role'])
      mapping = Mapping.find_or_initialize_by(name: row['Mapping'])
      question = Question.new(formated_params(row, role, mapping))
      error_rows << row_count unless question.save
      row_count += 1
    end
    [row_count, error_rows]
  end

  private

  def formated_params(row, role, mapping)
    { pri: row['Pri'],
      text: row['Question'],
      teaming_stage: row['Teaming Stages'],
      appears: row['Appears (Day)'],
      frequency: row['Frequency'],
      type: row['Type'],
      required: row['Required?'] == 'Yes',
      condition: row['Conditions'],
      role: role,
      mapping: mapping }
  end
end
