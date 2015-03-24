require "rails_helper"

RSpec.describe PrayerneedsController, :type => :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/prayerneeds").to route_to("prayerneeds#index")
    end

    it "routes to #new" do
      expect(:get => "/prayerneeds/new").to route_to("prayerneeds#new")
    end

    it "routes to #show" do
      expect(:get => "/prayerneeds/1").to route_to("prayerneeds#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/prayerneeds/1/edit").to route_to("prayerneeds#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/prayerneeds").to route_to("prayerneeds#create")
    end

    it "routes to #update" do
      expect(:put => "/prayerneeds/1").to route_to("prayerneeds#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/prayerneeds/1").to route_to("prayerneeds#destroy", :id => "1")
    end

  end
end
