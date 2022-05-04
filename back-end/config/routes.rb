Rails.application.routes.draw do
  # USER ROUTES
  post '/login', to: 'application#create' # login to account
  get '/profile', to: 'users#profile' #get profile using token

  # POST ROUTES
  post '/post', to: 'posts#create' # create a new post
  get '/post/:id', to: 'posts#show' # detailed Post info by ID
  get '/feed', to: 'posts#feed' # feed

  # Like routes
  post '/like', to: 'likes#create' # create like join table
  get '/likes/:id', to: 'likes#show' # Get like from a specific post
  delete '/like', to: 'likes#destroy' # Delete like

  # Follow routes
  post '/follow', to: 'follows#create' # Create a follow
  get '/followers', to: 'follows#followers' # Get followers
  get '/following', to: 'follows#following' # Get followers

  # Comment routes
  post '/comment', to: 'comments#create' # Create a comments
  get '/comments/:id', to: 'comments#show' # Show all comments for a post

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
