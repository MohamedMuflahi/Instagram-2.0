class UsersController < ApplicationController
    
    def create
        user = User.create!(user_params)
        if user
            payload = {'user_id': user.id}
            token = encode(payload)
            render json: {
                user: user,
                token: token,
                authenticated: true
            }
        else 
            render json: { message: 'There was an error creating your account' }
        end
    end

  def profile
    token = request.headers['Authentication'].split(' ')[1]
    payload = decode(token)
    user = User.find(payload['user_id'])
    if user
      render json: user
    else
      render json: { message: 'Error', authenticated: false }
    end
  end

  def update
    user = User.find(params[:id])
    if user
      user.update(avatar: params[:avatar])
      user.update(bio: params[:bio])
      user.update(username: params[:bio])
      render json: user
    else
      render json: { errors: "User Not Founc"}
    end
  end
  def posts
    user = User.find(params[:id])
    if user
      render json: user.posts, each_serializer: FeedSerializer
    else
      render json: { message: 'User not found'}
    end
  end
  def get_user
    user = User.find(params[:id])
    if user
      render json: user
    else
      render json: { message: 'Error', authenticated: false }
    end
  end
  private

  def user_params
    params.permit(:username, :password,:avatar,:bio)
  end
end
