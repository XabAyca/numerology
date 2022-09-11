class CreateDifferentLine < ActiveRecord::Migration[7.0]
  enable_extension 'hstore' unless extension_enabled?('hstore')
  def change
    create_table :lines do |t|
      t.integer :key
      t.hstore :data
      t.string :type, limit: 255
      t.timestamps
    end
    create_table :guidances do |t|
      t.references :line_of_life
      t.references :line_of_realisation
      t.hstore :data
      t.timestamps
    end
    add_foreign_key :guidances, :lines, column: :line_of_life_id, primary_key: :id
    add_foreign_key :guidances, :lines, column: :line_of_realisation_id, primary_key: :id

    add_index "lines", ["type"], name: "index_lines_on_type", using: :btree
  end
end
