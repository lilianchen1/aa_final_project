class UpdateImgUrlOnUsers < ActiveRecord::Migration
  def change
    remove_column :users, :img_url
    add_column :users, :img_url, :text,
                {null: false, default: "https://s3-us-west-2.amazonaws.com/no-phenotype-users-pics/antibody_cell.jpg"}
  end
end
