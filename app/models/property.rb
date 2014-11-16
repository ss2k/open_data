class Property < ActiveRecord::Base

  belongs_to :user
  has_many :favorites
  has_many :favorited_users, class_name:'User',through: :favorites, source: :user
  include Carmen

  geocoded_by :full_address
  after_validation :geocode

  def states
    mx = Country.named("Mexico")
    mx.subregions.map(&:name)
  end

  def full_address
    "#{add1}, #{add2}, #{city}, #{state}, #{zip}"
  end
end
