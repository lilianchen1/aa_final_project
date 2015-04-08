json.array! @tags do |tag|
  json.extract! tag, :id, :name
  json.questions_count tag.questions.count
end
