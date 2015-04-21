json.models (@users) do |user|
  json.extract!(user, :id, :username, :email, :img_url)
end

json.page params[:page]
json.total_pages @users.total_pages
