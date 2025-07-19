class CreateTodos < ActiveRecord::Migration[7.1]
  def change
    create_table :todos do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.string :description
      t.integer :category
      t.date :dueDate
      t.integer :priority
      t.boolean :done
      t.string :tags
      t.boolean :deleteFlg, default: false
      t.timestamps
    end
  end
end
