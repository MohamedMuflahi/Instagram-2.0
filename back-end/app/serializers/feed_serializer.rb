class FeedSerializer < ActiveModel::Serializer
  attributes :id, :caption, :image_url
  belongs_to :user
end
