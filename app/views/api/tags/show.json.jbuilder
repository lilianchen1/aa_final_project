json.extract!(@tag, :id, :name)

json.questions do
  json.array! @questions do |question|
    json.extract!(question, :id, :title, :content, :tag_list, :created_at, :user_id)
    json.user question.user.username
    json.answercount question.answers.count
    json.tags question.tags
  end
end
