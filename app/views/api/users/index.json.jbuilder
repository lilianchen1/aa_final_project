json.array!(@users) do |user|
  json.extract!(user, :id, :username, :email, :img_url)
end
