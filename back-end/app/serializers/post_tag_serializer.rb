class PostTagSerializer < ActiveModel::Serializer
  attributes :id, :post, :tag
end
