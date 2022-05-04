# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Follow.destroy_all
Message.destroy_all
Like.destroy_all
Comment.destroy_all
Post.destroy_all

puts 'Seeding Users...'
mohamed = User.create!({username: 'Mohamed', password: '123'});
mohamed.avatar.attach(
    io: File.open('./public/default.png'),
    filename: 'default.png',
    content_type: 'application/png'
)
ben = User.create!({username: 'Ben', password: '123'});
ben.avatar.attach(
    io: File.open('./public/default.png'),
    filename: 'default.png',
    content_type: 'application/png'
)
will = User.create!({username: 'Will', password: '123'});
will.avatar.attach(
    io: File.open('./public/default.png'),
    filename: 'default.png',
    content_type: 'application/png'
)
jack = User.create!({username: 'Jack', password: '123'});
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
post = Post.create({caption: "This is a caption", user_id: mohamed.id});
post.image.attach(
    io: File.open('./public/post.jpg'),
    filename: 'post.jpg',
    content_type: 'application/jpg'
  )
puts 'Seeding Like...'
Like.create(user_id:ben.id,post_id: post.id)
Like.create(user_id:jack.id,post_id: post.id)
Like.create(user_id:will.id,post_id: post.id)
puts 'Seeding Comments...'
Comment.create(content: "Love it", user_id: will.id,post_id: post.id)
puts 'Done.'
