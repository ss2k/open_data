class PropertiesController < ApplicationController

  before_filter :authenticate_user!, except: [:post_property]
  skip_before_filter  :verify_authenticity_token

  def new
    @property = current_user.properties.build
  end

  def create
    @property = current_user.properties.build(property_params)
    if @property.save
      flash[:notice] = "Your property is successfuly saved"
      redirect_to root_url
    else
      flash[:error] = "There was an error"
      render 'new'
    end
  end

  def show
    @property = Property.find(params[:id])
    @favorite = current_user.favorite_properties.new
    @lat = @property.latitude
    @long = @property.longitude
  end

  def index
  end

  def post_property
    listing_params = params
    listing_params.delete("action")
    listing_params.delete("controller")
    Property.create(listing_params)
    respond_to do |format|
      format.json { head :ok }
    end
  end

  private

  def property_params
    params.require(:property).permit(:add1, :add2, :city, :state, :zip, :image, :size, :rent)
  end
end
