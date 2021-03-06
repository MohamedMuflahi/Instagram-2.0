Rails.application.routes.draw do
  resources :post_tags
  resources :followed_tags
  resources :tags
  # USER ROUTES
  post '/login', to: 'application#create' # login to account
  get '/profile', to: 'users#profile' #get profile using token
  get '/user/posts/:id', to: 'users#posts' #get users posts using user id
  post '/user/update', to: 'users#update' # update User Data
  post '/user/updateAvatar', to: 'users#updateAvatar' # update User Data
  post '/signup', to: 'users#create' # update User Data
  get '/user/:id', to: 'users#get_user' # get users
  get "/users", to: 'users#users'
  get '/pro/:id', to: 'users#idProfile'
  # POST ROUTES
  post '/post', to: 'posts#create' # create a new post
  get '/post/:id', to: 'posts#show' # detailed Post info by ID
  post '/feed', to: 'posts#feed' # feed

  # Like routes
  post '/like', to: 'likes#create' # create like join table
  get '/likes/:id', to: 'likes#show' # Get like from a specific post
  delete '/like', to: 'likes#destroy' # Delete like

  # Follow routes
  post '/follow', to: 'follows#create' # Create a follow
  get '/followers/:id', to: 'follows#followers' # Get followers
  get '/following/:id', to: 'follows#following' # Get followers
  post '/unfollow', to: 'follows#unfollow'


  # Comment routes
  post '/comment', to: 'comments#create' # Create a comments
  get '/comments/:id', to: 'comments#show' # Show all comments for a post

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
