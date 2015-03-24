require 'rails_helper'

RSpec.describe "prayerneeds/show", :type => :view do
  before(:each) do
    @prayerneed = assign(:prayerneed, Prayerneed.create!(
      :title => "Title",
      :content => "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Title/)
    expect(rendered).to match(/MyText/)
  end
end
