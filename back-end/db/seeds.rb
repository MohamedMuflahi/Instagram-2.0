# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
User.destroy_all
Follow.destroy_all
Message.destroy_all
Like.destroy_all
Comment.destroy_all
Post.destroy_all

puts 'Seeding Users...'
mohamed = User.create!({username: 'Mohamed', password: '123',bio: 'My name is Mohamed Muflahi'});
mohamed.avatar.attach(
    io: File.open('./public/default.png'),
    filename: 'default.png',
    content_type: 'application/png'
)
ben = User.create!({username: 'Ben', password: '123',bio: 'My name is Ben'});
ben.avatar.attach(
    io: File.open('./public/default.png'),
    filename: 'default.png',
    content_type: 'application/png'
)
will = User.create!({username: 'Will', password: '123',bio: 'My name is Will'});
will.avatar.attach(
    io: File.open('./public/default.png'),
    filename: 'default.png',
    content_type: 'application/png'
)
jack = User.create!({username: 'Jack', password: '123',bio: 'My name is Jack'});
jack.avatar.attach(
    io: File.open('./public/default.png'),
    filename: 'default.png',
    content_type: 'application/png'
)
puts 'Seeding Follows...'
Follow.create(follower_id: mohamed.id, followee_id: ben.id);
puts 'Seeding Messages...'
Message.create(content: 'Hello',sender_id:mohamed.id,receiver_id: ben.id)
Message.create(content: 'How are you?',sender_id:mohamed.id,receiver_id: ben.id)
Message.create(content: 'Good you?',sender_id:ben.id,receiver_id: mohamed.id)
puts 'Seeding Posts...'
20.times do
    a = Faker::Number.between(from: 1, to: 4)
    b = Faker::Number.between(from: 1, to: 4)
    c = Faker::Number.between(from: 1, to: 4)
    d = Faker::Number.between(from: 1, to: 4)
    post = Post.create({caption: "This is a caption", user_id: a});
    post.image.attach(
    io: File.open('./public/post.jpg'),
    filename: 'post.jpg',
    content_type: 'application/jpg'
)
Like.create(user_id:a,post_id: post.id)
Like.create(user_id:b,post_id: post.id)
Like.create(user_id:c,post_id: post.id)
Like.create(user_id:d,post_id: post.id)
Comment.create(content: "Love it", user_id: b,post_id: post.id)
end
puts 'Seeding Like...'
puts 'Seeding Comments...'
puts 'Done.'
