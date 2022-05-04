class Post < ApplicationRecord
    has_many :likes
    has_many :comments
    belongs_to :user
    has_one_attached :image
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
