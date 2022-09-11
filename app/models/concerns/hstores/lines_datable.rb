module Hstores
  module LinesDatable
    extend ActiveSupport::Concern
    include Hstores::Hstorable

    included do

      LINES_DATA = {
        label_1:              { type: :string, default_value: "" },
        label_2:              { type: :string, default_value: "" },
        label_3:              { type: :string, default_value: "" },
      }

      process_hstore(LINES_DATA, :data)
    end
  end
end
