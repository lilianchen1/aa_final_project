json.extract!(@answer, :id, :content, :user_id, :created_at)
json.user @answer.user.username
