json.extract!(@user, :id, :username, :email, :created_at, :img_url)

json.questions @user.questions do |question|
  json.extract!(question, :id, :title)
  json.tags question.tags
end

json.answers @user.answers do |answer|
  json.questionForAnswer answer.question.title
  json.question_id answer.question_id
end

json.votes @user.votes do |vote|
  json.extract!(vote, :id, :user_id, :votable_id, :votable_type, :value)
end
