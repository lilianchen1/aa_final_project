class Answer < ActiveRecord::Base
  validates :content, :user, :question, presence: true
  belongs_to :user
  belongs_to :question
end
