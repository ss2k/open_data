class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :properties
  has_many :favorites
  has_many :favorite_properties, class_name: 'Property', through: :favorites, source: :property
  # before_create :save_role

  def owner?
    self.role == "owner"
  end

  def seeker?
    self.role == "seeker"
  end

  private

  def save_role
    self.role = "seeker"
  end

end
