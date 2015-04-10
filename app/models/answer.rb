class Answer < ActiveRecord::Base
  validates :content, :user, :question, presence: true
  belongs_to :user
  belongs_to :question
  has_many :votes, :as => :votable, dependent: :destroy
end
