class Question < ActiveRecord::Base
  validates :title, :content, :user, presence: true

  belongs_to :user
  has_many :answers
  has_many :taggings

  has_many :tags, through: :taggings, source: :tag

  def tag_list
    tags.map(&:name).join(", ")
  end

  def tag_list=(names)
    tag_names = names.split(",").map {|n| n.strip.downcase}.uniq
    new_or_found_tags = tag_names.map { |name| Tag.find_or_create_by(name: name) }
    self.tags = new_or_found_tags
  end
end
