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

  def votes_count
    votes.pluck(:value).inject(:+) || 0
  end

  def self.search_result(params)
    Question.where("title ~ ? OR content ~ ?", params, params)
            .order('questions.created_at DESC')
  end

  def self.unanswered
    Question.joins("LEFT OUTER JOIN answers ON questions.id = answers.question_id")
            .where("answers.question_id IS NULL")
            .order("questions.created_at DESC")
  end

  def self.sort_by_popularity
    subquery = Question.select("questions.*, SUM(COALESCE(votes.value, 0)) AS votes_count")
            .joins("LEFT OUTER JOIN votes ON questions.id = votes.votable_id")
            .where("votes.votable_type IS NULL OR votes.votable_type = 'Question'")
            .group("questions.id")

    res = Question.select("a.*, COUNT(answers.id) AS answer_count")
    .from(subquery, :a)
    .joins("LEFT OUTER JOIN answers ON a.id = answers.question_id")
    .group("a.id, a.title, a.content, a.created_at, a.updated_at, a.user_id, a.votes_count")
    .order("a.votes_count DESC, COUNT(answers.id) DESC, a.created_at DESC")

    res
  end
end
