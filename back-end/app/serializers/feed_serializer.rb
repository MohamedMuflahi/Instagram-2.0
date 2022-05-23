class FeedSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :tags, :created_at
  belongs_to :user
end
