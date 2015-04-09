json.array! @questions do |question|
  json.extract! question, :id, :title, :content, :user_id, :created_at, :tag_list
  json.user question.user.username
  json.answercount question.answers.count
  json.tags question.tags
  json.vote_count (question.votes.where("value = 1").count - question.votes.where("value = -1").count)
end
