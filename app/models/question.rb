class Question < ActiveRecord::Base
  validates :title, :content, :user, presence: true

  belongs_to :user
  has_many :answers
end
