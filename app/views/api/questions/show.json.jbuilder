json.extract!(@question, :id, :title, :content, :user_id, :created_at)

json.user @question.user.username

json.answers @question.answers do |answer|
  json.extract!(answer, :id, :content, :question_id, :user_id, :created_at)
  json.user answer.user.username
#   # json.comments answer.comments do |comment|
#   #   json.extract!(comment, :id, :content, :answer_id, :user_id)
  # end
end
