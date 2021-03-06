class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.string :content, null: false
      t.integer :user_id, null: false
      t.integer :question_id, null: false

      t.timestamps
    end
    add_index :answers, :user_id
    add_index :answers, :question_id
  end
end
