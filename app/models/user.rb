class User < ApplicationRecord
  ## Devise
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  ## Validations
  validates :email, presence: true
  validates :first_name, length: { minimum: 2 }, allow_blank: true
  validates :last_name, length: { minimum: 2 }, allow_blank: true

  ## Relations

  ## Scopes
end
