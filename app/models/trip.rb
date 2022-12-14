class Trip < ApplicationRecord
  include Rails.application.routes.url_helpers
  belongs_to :user
  has_many :activities, dependent: :destroy
  has_many :likes, dependent: :destroy 
  has_many_attached :images

  validates :name, :location, :date, :user_id, presence: true, on: :create

  validates :images, content_type: [:png, :jpg, :jpeg]

  # , size: { less_than: 3.megabytes , message: 'is too large' }

  #helps us store locally during development 
  # def image_urls
  #   images.map{ |img| Rails.application.routes.url_helpers.url_for(img)}
  # end

  def image_url(img)
    path = rails_blob_path(img, only_path: true)
    # "http://localhost:3000#{path}"
    "https://sum-trip-travel-journal.onrender.com#{path}"
 end

end
