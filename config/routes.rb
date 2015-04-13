Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :questions, except: [:new, :edit]
    resources :answers, only: [:create, :destroy]
    resources :tags, only: [:show, :index]
    resources :users, only: [:show, :index, :destroy]
    resources :votes, only: [:create, :destroy]
    resources :comments, only: [:create, :destroy]
  end
end
