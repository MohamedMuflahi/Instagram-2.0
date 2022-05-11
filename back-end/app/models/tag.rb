class Tag < ApplicationRecord
    has_many :post_tags
    has_many :followed_tags
    has_many :posts, through: :post_tags
    has_many :users, through: :followed_tags
end
