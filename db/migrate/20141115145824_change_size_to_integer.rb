class ChangeSizeToInteger < ActiveRecord::Migration
  def change
    change_column :properties, :size, 'integer USING CAST(size AS integer)'
  end
end
