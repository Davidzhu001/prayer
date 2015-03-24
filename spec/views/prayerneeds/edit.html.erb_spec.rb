require 'rails_helper'

RSpec.describe "prayerneeds/edit", :type => :view do
  before(:each) do
    @prayerneed = assign(:prayerneed, Prayerneed.create!(
      :title => "MyString",
      :content => "MyText"
    ))
  end

  it "renders the edit prayerneed form" do
    render

    assert_select "form[action=?][method=?]", prayerneed_path(@prayerneed), "post" do

      assert_select "input#prayerneed_title[name=?]", "prayerneed[title]"

      assert_select "textarea#prayerneed_content[name=?]", "prayerneed[content]"
    end
  end
end
