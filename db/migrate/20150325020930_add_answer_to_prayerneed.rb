class AddAnswerToPrayerneed < ActiveRecord::Migration
  def change
    add_column :prayerneeds, :answer, :boolean, :default => false
  end
end
