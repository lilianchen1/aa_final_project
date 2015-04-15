json.extract!(@tag, :id, :name)

json.questions do
  json.array! @questions do |question|
    json.extract!(question, :id, :title, :content, :tag_list, :created_at, :user_id)
    json.vote_count (question.votes.where("value = 1").count - question.votes.where("value = -1").count)
    json.user question.user.username
    json.user_img question.user.img_url
    json.answercount question.answers.count
    json.tags question.tags
  end
end
