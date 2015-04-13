class Answer < ActiveRecord::Base
  validates :content, :user, :question, :presence => true
  validates_inclusion_of :accepted, :in => [true, false]
  belongs_to :user
  belongs_to :question
  has_many :votes, :as => :votable, dependent: :destroy

  has_many :comments, :as => :commentable, dependent: :destroy
end
