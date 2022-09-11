class Guidance < ApplicationRecord
  ## Includes
  include Hstores::LinesDatable

  ## Validations
  validates :key, presence: true
  validates :line_of_realisation, presence: true
  validates :line_of_life, presence: true

  ## Relations
  belongs_to :line_of_realisation, class_name: "line", foreign_key: "line_of_realisation_id"
  belongs_to :line_of_life, class_name: "line", foreign_key: "line_of_life_id"

  ## Scopes
end
