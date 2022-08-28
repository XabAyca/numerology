class User < ApplicationRecord
  ## Devise
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  ## Validations
  validates :email, presence: true
  validates :first_name, length: { minimum: 2 }
  validates :last_name, length: { minimum: 2 }

  ## Relations

  ## Scopes
end
