# frozen_string_literal: true

class Api::V1::QuestionsController< ApplicationController
  before_action :set_question, only: %i[update destroy]

  def index
    questions = Question.paginate(page: params[:page])
    render json: questions, adapter: :json, meta: pagination_data(questions)
  end

  def create
    begin
      ActiveRecord::Base.transaction do
        role = Role.find_or_initialize_by(name: params[:question].dig(:role))
        mapping = Mapping.find_or_initialize_by(name: params[:question].dig(:mapping))
        question = Question.new(question_params.merge(required: params[:question].dig(:required)=='Yes', role: role, mapping: mapping))
        question.save!
        render json: question
      end
    rescue Exception => e
      render json: { success: false, message: e }
    end
  end

  def destroy
    if @question.destroy
      render json: @question
    else
      render josn: { success: false, message: @question.errors.full_messages }
    end
  end

  def update
    if @question.update(question_params)
      render json: @question
    else
      render josn: { success: false, message: @question.errors.full_messages }
    end
  end

  def pagination_data(questions)
    {}.tap do |data|
      data[:next_page] = questions.next_page
      data[:previous_page] = questions.previous_page
      data[:total_pages] = questions.total_pages
      data[:current_page] = questions.current_page
    end    
  end

  private

  def question_params
    params.require(:question).permit(:id, :text, :type, :appears, :teaming_stage, :condition, :frequency, :required)
  end

  def set_question
    @question = Question.find(params[:id])
  end
end
