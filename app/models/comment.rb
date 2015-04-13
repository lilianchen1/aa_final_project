class Comment < ActiveRecord::Base
  belongs_to :commentable, :polymorphic => true
  validates :content, presence: true
  belongs_to :user
end
