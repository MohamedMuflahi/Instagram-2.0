class ApplicationController < ActionController::API
    def secret_key
        'random_key'
    end

    def encode(payload)
        JWT.encode(payload, secret_key, 'HS256')
    end

    def decode(token)
        JWT.decode(token, secret_key, true, { algorithm: 'HS256'})[0]
    end
    def create
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            # session[:user_id] = user.id
            payload = {'user_id': user.id}
            token = encode(payload)
            # result = serialize(user, UserSerializer).
            # merge(serialize(token, UserSerializer))
            x = user.as_json(only: [:id, :username,:bio], methods: [:avatar_url,:follower_count,:following_count, :post_count]) 
            # include: { posts: {include: { comments: {only: :body } },only: :title } }
            render json: {user: x, token: token}
            
        else 
            render json: {
                message: 'This username/password combination cannot be found',
                authenticated: false
            }
        end
    end
    # def serialize(collection, serializer, adapter = :json)
    #     ActiveModelSerializers::SerializableResource.new(
    #       collection,
    #       serializer: serializer,
    #       adapter: adapter
    #     ).as_json
    #   end
end
