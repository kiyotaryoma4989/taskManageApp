Rails.application.routes.draw do
  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  root "users#new"
  get "todos", to: "todos#index"
  get "login", to: "users#new"
  post "/login",  to: "sessions#create"
  patch 'todos/:id/done', to: 'todos#update_done'
  patch 'todos/:id/delete', to: 'todos#update_delete_flg'
  delete "/logout", to: "sessions#destroy"
  resources :users
  resources :todos
  resources :categories
end
