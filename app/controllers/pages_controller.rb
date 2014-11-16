class PagesController < ApplicationController
  
  before_filter :authenticate_user!

  def home
    @lat = 19.4333
    @long = -99.1333
    @properties = current_user.owner? ? current_user.properties : current_user.favorite_properties.limit(4)
    @all_properties = Property.all
    @hash = Gmaps4rails.build_markers(@all_properties) do |property, marker|
      marker.lat property.latitude
      marker.lng property.longitude
    end
  end

  def search
    @query = params[:query]
    query_string = "#{@query}, Mexico City, Mexico"
    location = Geocoder.search(query_string)
    @lat = location[0].latitude
    @long = location[0].longitude
    @properties = Property.near(query_string, 5)
  end
end
