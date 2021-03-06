json.models @questions do |question|
  json.extract! question, :id, :title, :content, :user_id, :created_at, :tag_list
  json.user question.user.username
  json.user_img question.user.img_url
  json.answercount question.answers.count
  json.tags question.tags
  json.vote_count question.votes_count
end

json.page params[:page]
json.total_pages @questions.total_pages
