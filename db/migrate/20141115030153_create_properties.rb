class CreateProperties < ActiveRecord::Migration
  def change
    create_table :properties do |t|
      t.string :add1
      t.string :add2
      t.string :city
      t.string :state
      t.integer :zip
      t.integer :rent
      t.integer :user_id

      t.timestamps
    end
  end
end
