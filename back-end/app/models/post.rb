class Post < ApplicationRecord
    has_many :likes
    has_many :comments
    has_many :post_tags
    has_many :tags, through: :post_tags
    belongs_to :user
    has_one_attached :image
    # alias_method :read_attribute_for_serialization, :[]
    def image_url
        image.url
    end
    def likes_count
        likes.length
    end
    def comments_count
        comments.length
    end
    
end
