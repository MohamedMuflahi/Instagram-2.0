class LikesController < ApplicationController
    def create
        like = Like.create!(like_params)
        if like
            render json: like
        else
            render json: { message: 'There was an error creating the Like' }
        end
    end
    def show
        likes = Like.where(post_id: params[:id])
        render json: likes
    end
    def destroy
        like = Like.find_by(like_params)
        if like
            like.destroy
            render json: { message: 'Like has been successfully removed'}
        else
            render json: { message: 'There was an error in removing the like'}
        end
    end
    def like_params
        params.permit(:user_id, :post_id)
    end
end
