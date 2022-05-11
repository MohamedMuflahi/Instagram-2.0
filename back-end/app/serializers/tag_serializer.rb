class TagSerializer < ActiveModel::Serializer
  attributes :id, :name, :posts
end
