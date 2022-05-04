class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :image_url, :likes, :comments
  belongs_to :user
end
