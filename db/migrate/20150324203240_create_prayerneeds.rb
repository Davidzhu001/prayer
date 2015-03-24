class CreatePrayerneeds < ActiveRecord::Migration
  def change
    create_table :prayerneeds do |t|
      t.string :title
      t.text :content

      t.timestamps null: false
    end
  end
end
