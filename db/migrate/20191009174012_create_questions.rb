class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.integer :pri
      t.text :text, null: false
      t.string :teaming_stage #enum
      t.integer :appears
      t.integer :frequency
      t.string :type #enum
      t.boolean :required
      t.string :condition #enum
      t.integer :mapping_id, foreign_key: true
      t.integer :role_id, foreign_key: true

      t.timestamps
    end
  end
end
