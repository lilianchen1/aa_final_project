Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :questions, except: [:new, :edit]
    resources :answers, only: [:create, :destroy]
    resources :tags, only: [:show, :index]

    resources :votes, only: [:create, :destroy]
  end
end
