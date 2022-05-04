class Message < ApplicationRecord
    belongs_to :sent, foreign_key: "sender_id", class_name: "User"
    belongs_to :recieved, foreign_key: "receiver_id", class_name: "User"
    validates :content, presence: true
end
