class Question < ActiveRecord::Base
  validates :title, :content, :user, presence: true

  belongs_to :user
  has_many :answers, dependent: :destroy
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings, source: :tag
  has_many :votes, :as => :votable, dependent: :destroy

  has_many :comments, :as => :commentable, dependent: :destroy

  def tag_list
    tags.map(&:name).join(", ")
  end

  def tag_list=(names)
    tag_names = names.split(",").map {|n| n.strip.downcase}.uniq
    new_or_found_tags = tag_names.map { |name| Tag.find_or_create_by(name: name) }
    self.tags = new_or_found_tags
  end

  def self.sort_by_popularity
    # need to take into consideration negative votes!!
    #order count votes.votable_id where value = 1 minus ...value = -1
    Question.joins('LEFT OUTER JOIN votes ON questions.id = votes.votable_id')
      .joins('LEFT OUTER JOIN answers ON answers.question_id = questions.id')
      .where("votes.votable_type = 'Question' OR votes.votable_type IS NULL")
      .group("questions.id")
      .order("SUM(votes.value) DESC")      
      .order("COUNT(answers.question_id) DESC")
      .order("questions.created_at DESC")
  end
end
