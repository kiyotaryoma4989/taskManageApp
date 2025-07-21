class CreateTodos < ActiveRecord::Migration[7.1]
  def change
    create_table :todos do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.string :description
      t.references  :category, foreign_key: true
      t.date :due_date
      t.integer :priority
      t.boolean :done
      t.string :tags
      t.boolean :delete_flg, default: false
      t.timestamps
    end
  end
end
