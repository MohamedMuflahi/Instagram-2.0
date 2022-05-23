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
Tag.destroy_all
FollowedTag.destroy_all
PostTag.destroy_all

puts 'Seeding Users...'
mohamed = User.create!({username: 'Mohamed', password: '123',bio: 'My name is Mohamed Muflahi, Student at the the Flatiron School'});
mohamed.avatar.attach(
    io: File.open('./public/default.png'),
    filename: 'default.png',
    content_type: 'application/png'
)
brandon = User.create!({username: 'Brandon', password: '123',bio: 'My name is Brandon, Instructor at the Flatiron school'});
brandon.avatar.attach(
    io: File.open('./public/default.png'),
    filename: 'default.png',
    content_type: 'application/png'
)
will = User.create!({username: 'Will', password: '123',bio: 'My name is Will, Student at the the Flatiron School'});
will.avatar.attach(
    io: File.open('./public/default.png'),
    filename: 'default.png',
    content_type: 'application/png'
)
rodney = User.create!({username: 'Rodney', password: '123',bio: 'My name is Rodney, Student at the the Flatiron School'});
rodney.avatar.attach(
    io: File.open('./public/default.png'),
    filename: 'default.png',
    content_type: 'application/png'
)
axel = User.create!({username: 'Axel', password: '123',bio: 'My name is Axle, Student at the the Flatiron School'});
axel.avatar.attach(
    io: File.open('./public/default.png'),
    filename: 'default.png',
    content_type: 'application/png'
)
puts 'Seeding Follows...'
Follow.create(follower_id: mohamed.id, followee_id: brandon.id);
Follow.create(follower_id: mohamed.id, followee_id: will.id);
Follow.create(follower_id: mohamed.id, followee_id: rodney.id);
Follow.create(follower_id: mohamed.id, followee_id: axel.id);

Follow.create(follower_id: brandon.id, followee_id: mohamed.id);
Follow.create(follower_id: will.id, followee_id: mohamed.id);
Follow.create(follower_id: rodney.id, followee_id: mohamed.id);
Follow.create(follower_id: axel.id, followee_id: mohamed.id);
puts 'Seeding Posts...'

post1 = Post.create({caption: Faker::Quote.famous_last_words, user_id: 2});
    post1.image.attach(
    io: File.open('./public/image.png'),
    filename: 'image.png',
    content_type: 'application/png'
)
Like.create(user_id: 1,post_id: post1.id)
Like.create(user_id: 2,post_id: post1.id)
Like.create(user_id: 3,post_id: post1.id)
Like.create(user_id: 4,post_id: post1.id)
Like.create(user_id: 5,post_id: post1.id)

Comment.create(content: Faker::Quote.famous_last_words, user_id: 1,post_id: post1.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post1.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post1.id)

#


post2 = Post.create({caption: Faker::Quote.famous_last_words, user_id: 3});
    post2.image.attach(
    io: File.open('./public/image1.png'),
    filename: 'image1.png',
    content_type: 'application/png'
)
Like.create(user_id: 1,post_id: post2.id)
Like.create(user_id: 2,post_id: post2.id)
Like.create(user_id: 3,post_id: post2.id)
Like.create(user_id: 4,post_id: post2.id)
Like.create(user_id: 5,post_id: post2.id)


Comment.create(content: Faker::Quote.famous_last_words, user_id: 1,post_id: post2.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post2.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post2.id)



post3 = Post.create({caption: Faker::Quote.famous_last_words, user_id: 5});
    post3.image.attach(
    io: File.open('./public/image2.png'),
    filename: 'image2.png',
    content_type: 'application/png'
)
Like.create(user_id: 1,post_id: post3.id)
Like.create(user_id: 2,post_id: post3.id)
Like.create(user_id: 3,post_id: post3.id)
Like.create(user_id: 4,post_id: post3.id)
Like.create(user_id: 5,post_id: post3.id)


Comment.create(content: Faker::Quote.famous_last_words, user_id: 1,post_id: post3.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post3.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post3.id)





post4 = Post.create({caption: Faker::Quote.famous_last_words, user_id: 2});
    post4.image.attach(
    io: File.open('./public/image3.png'),
    filename: 'image3.png',
    content_type: 'application/png'
)
Like.create(user_id: 1,post_id: post4.id)
Like.create(user_id: 2,post_id: post4.id)
Like.create(user_id: 3,post_id: post4.id)
Like.create(user_id: 4,post_id: post4.id)
Like.create(user_id: 5,post_id: post4.id)


Comment.create(content: Faker::Quote.famous_last_words, user_id: 1,post_id: post4.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post4.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post4.id)



post5 = Post.create({caption: Faker::Quote.famous_last_words, user_id: 5});
    post5.image.attach(
    io: File.open('./public/image4.png'),
    filename: 'image4.png',
    content_type: 'application/png'
)
Like.create(user_id: 1,post_id: post5.id)
Like.create(user_id: 2,post_id: post5.id)
Like.create(user_id: 3,post_id: post5.id)
Like.create(user_id: 4,post_id: post5.id)
Like.create(user_id: 5,post_id: post5.id)

Comment.create(content: Faker::Quote.famous_last_words, user_id: 1,post_id: post5.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post5.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post5.id)



post6 = Post.create({caption: Faker::Quote.famous_last_words, user_id: 4});
    post6.image.attach(
    io: File.open('./public/image5.png'),
    filename: 'imag5.png',
    content_type: 'application/png'
)
Like.create(user_id: 1,post_id: post6.id)
Like.create(user_id: 2,post_id: post6.id)
Like.create(user_id: 3,post_id: post6.id)
Like.create(user_id: 4,post_id: post6.id)
Like.create(user_id: 5,post_id: post6.id)


Comment.create(content: Faker::Quote.famous_last_words, user_id: 1,post_id: post6.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post6.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post6.id)


post7 = Post.create({caption: Faker::Quote.famous_last_words, user_id: 5});
    post7.image.attach(
    io: File.open('./public/image6.png'),
    filename: 'image6.png',
    content_type: 'application/png'
)
Like.create(user_id: 1,post_id: post7.id)
Like.create(user_id: 2,post_id: post7.id)
Like.create(user_id: 3,post_id: post7.id)
Like.create(user_id: 4,post_id: post7.id)
Like.create(user_id: 5,post_id: post7.id)


Comment.create(content: Faker::Quote.famous_last_words, user_id: 1,post_id: post7.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post7.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post7.id)





post8 = Post.create({caption: Faker::Quote.famous_last_words, user_id: 3});
    post8.image.attach(
    io: File.open('./public/image7.png'),
    filename: 'image7.png',
    content_type: 'application/png'
)
Like.create(user_id: 1,post_id: post8.id)
Like.create(user_id: 2,post_id: post8.id)
Like.create(user_id: 3,post_id: post8.id)
Like.create(user_id: 4,post_id: post8.id)
Like.create(user_id: 5,post_id: post8.id)


Comment.create(content: Faker::Quote.famous_last_words, user_id: 1,post_id: post8.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post8.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post8.id)


post9 = Post.create({caption: Faker::Quote.famous_last_words, user_id: 4});
    post9.image.attach(
    io: File.open('./public/image8.png'),
    filename: 'image8.png',
    content_type: 'application/png'
)
Like.create(user_id: 1,post_id: post9.id)
Like.create(user_id: 2,post_id: post9.id)
Like.create(user_id: 3,post_id: post9.id)
Like.create(user_id: 4,post_id: post9.id)
Like.create(user_id: 5,post_id: post9.id)


Comment.create(content: Faker::Quote.famous_last_words, user_id: 1,post_id: post9.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post9.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post9.id)


post10 = Post.create({caption: Faker::Quote.famous_last_words, user_id: 2});
    post10.image.attach(
    io: File.open('./public/image9.png'),
    filename: 'image9.png',
    content_type: 'application/png'
)
Like.create(user_id: 1,post_id: post10.id)
Like.create(user_id: 2,post_id: post10.id)
Like.create(user_id: 3,post_id: post10.id)
Like.create(user_id: 4,post_id: post10.id)
Like.create(user_id: 5,post_id: post10.id)


Comment.create(content: Faker::Quote.famous_last_words, user_id: 1,post_id: post10.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post10.id)
Comment.create(content: Faker::Quote.famous_last_words, user_id: 2,post_id: post10.id)


tag1 = Tag.create(name: "JavaScript")
tag2 = Tag.create(name: "memes")
tag3 = Tag.create(name: "Flatiron")

FollowedTag.create(user_id: 1,tag_id: tag1.id)
FollowedTag.create(user_id: 1,tag_id: tag2.id)
FollowedTag.create(user_id: 1,tag_id: tag3.id)

PostTag.create(post_id: post1.id,tag_id: tag1.id)
PostTag.create(post_id: post1.id,tag_id: tag2.id)
PostTag.create(post_id: post2.id,tag_id: tag1.id)
PostTag.create(post_id: post2.id,tag_id: tag2.id)
PostTag.create(post_id: post3.id,tag_id: tag1.id)
PostTag.create(post_id: post3.id,tag_id: tag2.id)
PostTag.create(post_id: post4.id,tag_id: tag1.id)
PostTag.create(post_id: post4.id,tag_id: tag2.id)
PostTag.create(post_id: post5.id,tag_id: tag1.id)
PostTag.create(post_id: post5.id,tag_id: tag2.id)
PostTag.create(post_id: post6.id,tag_id: tag1.id)
PostTag.create(post_id: post6.id,tag_id: tag2.id)
PostTag.create(post_id: post7.id,tag_id: tag1.id)
PostTag.create(post_id: post7.id,tag_id: tag2.id)
PostTag.create(post_id: post8.id,tag_id: tag1.id)
PostTag.create(post_id: post8.id,tag_id: tag2.id)
PostTag.create(post_id: post9.id,tag_id: tag1.id)
PostTag.create(post_id: post9.id,tag_id: tag2.id)
PostTag.create(post_id: post10.id,tag_id: tag1.id)
PostTag.create(post_id: post10.id,tag_id: tag2.id)


puts 'Seeding Like...'
puts 'Seeding Comments...'
puts 'Done.'
