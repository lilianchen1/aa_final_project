class AddAcceptedToAnswers < ActiveRecord::Migration
  def change
    add_column :answers, :accepted, :boolean, {null: false, default: false}
  end
end
