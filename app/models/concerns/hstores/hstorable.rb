module Hstores
  module Hstorable
    extend ActiveSupport::Concern

    module ClassMethods
      # ==========================================================================
      # > Helpers
      # ==========================================================================

      def process_hstore(hstore_schema, hstore_field)
        hstore_schema.each do |field, data|
          handle_field(hstore_field, field, data)
        end
      end

      # Generate the helpers method necessary for the given field in the hstore
      def handle_field(hstore_field, field, data)

        %w[getter setter].each do |helper_type|
          send("handle_hstore_field_#{data[:type]}_#{helper_type}", hstore_field, field, data)
        end
      end

      # ==========================================================================
      # > String
      # ==========================================================================

      def handle_hstore_field_string_getter(hstore, field, data)
        define_method(field) do
          field_value = send(hstore)&.dig(field.to_s)
          field_value.present? ? field_value.to_s : data[:default_value].to_s
        end
      end

      def handle_hstore_field_string_setter(hstore, field, _data)
        define_method("#{field}=") do |value|
          db_field = send(hstore) || {}
          db_field[field.to_s] = value.to_s
          send("#{hstore}=", db_field)
        end
      end
    end
  end
end
