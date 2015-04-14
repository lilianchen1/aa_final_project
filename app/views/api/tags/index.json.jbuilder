json.models @tags do |tag|
  json.extract! tag, :id, :name
  json.questions_count tag.questions.count
end

json.page params[:page]
json.total_pages @tags.total_pages
