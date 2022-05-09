class UserSerializer < ActiveModel::Serializer
  attributes :id, :username,:avatar_url,:follower_count,:following_count, :post_count,:bio
end
