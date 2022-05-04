class PostsController < ApplicationController
    def create
        post = Post.create!(post_params)
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
        post = Post.all # temporarily get all
        render json: post# , each_serializer: FeedSerializer 
    end
    def post_params
        params.permit(:caption, :user_id,:image)
    end
end
