class CreateRoles < ActiveRecord::Migration[5.2]
  def change
    create_table :roles do |t|
			t.string :name, null: false #enum
      t.timestamps
    end
  end
end
