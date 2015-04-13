json.extract!(@answer, :id, :content, :user_id, :created_at)
json.user @answer.user.username
json.vote_count (@answer.votes.where("value = 1").count - @answer.votes.where("value = -1").count)
json.votes @answer.votes

json.current_user_vote @answer.votes.find_by(user_id: current_user.id)
