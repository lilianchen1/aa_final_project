json.extract!(@answer, :id, :content, :user_id, :created_at)
json.user @answer.user.username
json.vote_count (@answer.votes.where("value = 1").count - @answer.votes.where("value = -1").count)
