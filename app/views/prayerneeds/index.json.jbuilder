json.array!(@prayerneeds) do |prayerneed|
  json.extract! prayerneed, :id, :title, :content
  json.url prayerneed_url(prayerneed, format: :json)
end
