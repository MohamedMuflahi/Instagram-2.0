class PostsController < ApplicationController
    
    def create
        post = Post.create!(post_params)
        PostTag.create(post_id: post.id,tag_id: 3)
        if post
            render json: post
        else 
            render json: { message: 'There was an error creating the Post' }
        end
    end
    def show
        post = Post.find(params[:id])
        if post
            render json: post 
        else
            render json: { message: 'Could Not Find Post' }
        end
    end
    def feed
       user = User.find(params[:id])
       if user
        # x= Post.where(tags: user.tags)
        # render json: x
        sql = "SELECT p.id FROM post_tags pt INNER JOIN posts p ON p.id = pt.post_id  WHERE pt.tag_id IN (SELECT ft.tag_id FROM followed_tags ft WHERE ft.user_id = 1)"
        sql2 = "SELECT p.id FROM posts p WHERE p.user_id IN (SELECT user_id FROM follows f WHERE f.follower_id = 1)"
        array = ActiveRecord::Base.connection.execute(sql)
        array2 =  ActiveRecord::Base.connection.execute(sql2)
        array3 = array + array2

        array4 = []

        array3.each do |e|
            # puts e["id"]
            # puts("HERE",e["id"])
            array4.push(e["id"])
        end
        x = Post.where(id: array4).page(params[:page]).per_page(30)
        # options = { each_serializer: PostSerializer }
       
        # output = ActiveModelSerializers::PostSerializer.new(array3, options).as_json #  x  = array3.as_json(only: [:id, :caption], methods: [:image_url,:comments_count,:likes_count, :post_count]) 
        render json: x
       end
    end
    def post_params
        params.permit(:caption, :user_id,:image)
    end
end
