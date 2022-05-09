class FeedSerializer < ActiveModel::Serializer
  attributes :id, :image_url
  belongs_to :user
end
