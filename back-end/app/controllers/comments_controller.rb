class CommentsController < ApplicationController
    def create
       
        comment = Comment.create!(comment_params)
        if comment
            render json: comment
        else
            render json: { message: 'There was an error creating the Like' }
        end
    end
    def show
        comments = Comment.where(post_id: params[:id])
        render json: comments
    end
    def comment_params
        params.permit(:user_id, :post_id,:content)
    end
end
