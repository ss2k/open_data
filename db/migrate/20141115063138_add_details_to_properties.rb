class AddDetailsToProperties < ActiveRecord::Migration
  def change
    add_column :properties, :size, :string
    add_column :properties, :image, :string
  end
end
