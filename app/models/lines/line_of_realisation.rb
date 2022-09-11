module Lines
  class LineOfRealisation < Line
    ## Validations
    validates :key, uniqueness: true

    ## Relations
    has_many :guidances, class_name: "guidance", foreign_key: "line_of_realisation_id"

    ## Scopes
  end
end
