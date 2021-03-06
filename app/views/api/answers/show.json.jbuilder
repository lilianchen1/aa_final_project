json.extract!(@answer, :id, :content, :user_id, :created_at, :accepted)
json.user @answer.user.username
json.vote_count (@answer.votes.where("value = 1").count - @answer.votes.where("value = -1").count)
json.votes @answer.votes
json.question @answer.question
json.user_img @answer.user.img_url

json.comments @answer.comments do |comment|
  json.extract!(comment, :id, :content, :created_at, :user_id, :commentable_id, :commentable_type)
  json.user comment.user.username
end
