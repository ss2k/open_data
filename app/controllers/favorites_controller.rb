class FavoritesController < ApplicationController

  def index
    @properties = current_user.favorite_properties
  end
  def create
    @property = Property.find(params[:property_id])
    @favorite = current_user.favorite_properties << @property
    respond_to do |format|
      format.js
    end
  end
end
