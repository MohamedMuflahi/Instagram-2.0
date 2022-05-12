class UsersController < ApplicationController
    
    def create
        user = User.create!(user_params)
        if user
          user.avatar.attach(
            io: File.open('./public/default.png'),
            filename: 'default.png',
            content_type: 'application/png'
        )
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
    user = User.find_by(id:params[:user_id])
    if user
      user.username = params[:username]
      user.bio = params[:bio]
      # user.delete(:password) unless params[:password].present?
      user.save!(validate: false)
      render json: user
    else
      render json: { errors: "User Not Founc"}
    end
  end

  def updateAvatar
    user = User.find(params[:user_id])
    if user
      user.avatar.purge
      user.avatar.attach(params[:avatar])
      puts user.errors.full_messages
      user.save!(validate: false)
      # user.save!(validate: false)
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
  def users
    render json: User.all
  end
  private

  def user_params
    params.permit(:username,:bio,:password)
  end
  def update_params
    params.require(:user).permit(:user_id,:username,:bio)
    update_params.delete(:password) unless user_params[:password].present?
    update_params
  end

end
