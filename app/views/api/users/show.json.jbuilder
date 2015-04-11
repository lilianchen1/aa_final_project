json.extract!(@user, :id, :username, :email, :created_at)

json.questions @user.questions do |question|
  json.extract!(question, :id, :title)
end

json.votes @user.votes do |vote|
  json.extract!(vote, :id, :user_id, :votable_id, :votable_type, :value)
end
