json.extract!(@comment, :id, :user_id, :content, :commentable_id, :commentable_type, :created_at)

json.user @comment.user.username
