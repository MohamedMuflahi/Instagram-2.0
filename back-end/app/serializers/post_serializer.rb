class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :image_url,:comments_count,:likes_count,:tags,:created_at
  belongs_to :user
end
