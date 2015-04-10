class Tag < ActiveRecord::Base
  has_many :taggings, dependent: :destroy

  has_many :questions, through: :taggings, source: :question
end
