Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :questions, only: %i[index create destroy update]
    end
  end

  root to: 'home#index'

  resources :file, only: [:new] do
  	collection do
    	post 'import'
  	end
  end
end
