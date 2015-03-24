class AddUserToPrayerneed < ActiveRecord::Migration
  def change
    add_reference :prayerneeds, :user, index: true
    add_foreign_key :prayerneeds, :users
  end
end
