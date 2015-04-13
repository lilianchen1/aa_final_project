json.extract!(@question, :id, :title, :content, :user_id, :created_at, :tag_list)

json.user @question.user.username
json.vote_count (@question.votes.where("value = 1").count - @question.votes.where("value = -1").count)

json.votes @question.votes do |vote|
  json.extract!(vote, :id, :value, :user_id, :votable_type, :votable_id)
end

json.tags @question.tags

json.answers @question.answers do |answer|
  json.extract!(answer, :id, :content, :question_id, :user_id, :created_at)
  json.user answer.user.username
  json.vote_count (answer.votes.where("value = 1").count - answer.votes.where("value = -1").count)
  json.votes answer.votes

  json.comments answer.comments do |comment|
  json.extract!(comment, :id, :content, :commentable_id, :commentable_type, :user_id, :created_at)
  json.user comment.user.username
  end
end

json.comments @question.comments do |comment|
  json.extract!(comment, :id, :content, :created_at, :user_id, :commentable_id, :commentable_type)
  json.user comment.user.username
end
