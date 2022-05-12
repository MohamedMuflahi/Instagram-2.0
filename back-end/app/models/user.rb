class User < ApplicationRecord
    has_many :follower_follows, foreign_key: :followee_id, class_name: "Follow" 
    # source: :follower matches with the belong_to :follower identification in the Follow model 
    has_many :followers, through: :follower_follows, source: :follower
    # followee_follows "names" the Follow join table for accessing through the followee association
    has_many :followee_follows, foreign_key: :follower_id, class_name: "Follow"    
    # source: :followee matches with the belong_to :followee identification in the Follow model   
    has_many :followees, through: :followee_follows, source: :followee

    has_many :messages_sent, foreign_key: :sender_id, class_name: "Message" 
    has_many :senders, through: :messages_sent, source: :sent
    has_many :messages_received, foreign_key: :receiver_id, class_name: "Message"    
    has_many :receivers, through: :messages_received, source: :recieved

    has_many :comments
    has_many :posts
    has_many :likes
    has_one_attached :avatar
    has_secure_password
    validates :username, presence: true, uniqueness: { case_sensitive: false }
    validates :password, presence: true, allow_nil: true
    def avatar_url
        avatar.url
    end
    def following_count
        followee_follows.length
    end
    def follower_count
        follower_follows.length
    end
    def post_count
        posts.length
    end
    has_many :followed_tags
    has_many :tags,through: :followed_tags

    def following_id
        x =[]
        followees.each do |f|
            x.push(f.id)
        end
        x
    end
end
