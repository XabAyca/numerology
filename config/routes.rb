Rails.application.routes.draw do
  scope "(:locale)", locale: /#{I18n.available_locales.join('|')}/ do

    root "static_pages#index"

    devise_scope :user do
      # Redirests signing out users back to sign-in
      get "users", to: "devise/sessions#new"
    end
    devise_for :users
  end
end
