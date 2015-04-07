json.extract!(@question, :id, :title, :content, :user_id, :created_at)

json.user @question.user.username
