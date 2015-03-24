require 'rails_helper'

RSpec.describe "prayerneeds/new", :type => :view do
  before(:each) do
    assign(:prayerneed, Prayerneed.new(
      :title => "MyString",
      :content => "MyText"
    ))
  end

  it "renders new prayerneed form" do
    render

    assert_select "form[action=?][method=?]", prayerneeds_path, "post" do

      assert_select "input#prayerneed_title[name=?]", "prayerneed[title]"

      assert_select "textarea#prayerneed_content[name=?]", "prayerneed[content]"
    end
  end
end
