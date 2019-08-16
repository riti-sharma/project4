Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  get '/users/verify', to: 'users#verify'
  resources :users do
    resources :groups
  end
  resources :groups do
    resources :posts
  end
  resources :posts
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
