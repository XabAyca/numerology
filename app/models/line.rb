class Line < ApplicationRecord
  ## Includes
  include Hstores::LinesDatable

  ## Validations
  validates :key, presence: true

  ## Relations
  has_many :guidances, class_name: "guidance", foreign_key: "line_of_realisation_id"

  ## Scopes

end
