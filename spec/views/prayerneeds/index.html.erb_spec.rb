require 'rails_helper'

RSpec.describe "prayerneeds/index", :type => :view do
  before(:each) do
    assign(:prayerneeds, [
      Prayerneed.create!(
        :title => "Title",
        :content => "MyText"
      ),
      Prayerneed.create!(
        :title => "Title",
        :content => "MyText"
      )
    ])
  end

  it "renders a list of prayerneeds" do
    render
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
