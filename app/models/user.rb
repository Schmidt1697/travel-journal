class User < ApplicationRecord
    include Rails.application.routes.url_helpers
    has_many :trips, dependent: :destroy
    has_many :activities, through: :trips
    has_many :likes, dependent: :destroy
    has_many :liked_trips, through: :likes, :source => :trip
    has_one_attached :avatar, dependent: :purge
    # has_one_attached :attachment, dependent: :destroy

    has_secure_password
    PASSWORD_REQUIREMENTS = /\A
        (?=.{8,}) #minimum 8 chars long
        (?=.*\d) #contain at least one number
        (?=.*[a-z]) #contain at least one lowercase letter
        (?=.*[A-Z]) #at least one uppercase letter
        (?=.*[[:^alnum:]]) #at least one symbol
    /x

    validates :name, :username, :bio, presence: true
    validates :password, presence: true, format: { with: PASSWORD_REQUIREMENTS, message: "Must be at least 8 characters, include at least one upper case letter, one lower case letter, one number and one symbol."}, on: :create
    validates :username, uniqueness: true
    
     validates :avatar, content_type: [:png, :jpg, :jpeg], size: { less_than: 3.megabytes , message: '/ Profile Image is too large' }
        # validates :attachment, content_type: { in: 'application/pdf', message: 'is not a PDF' }
    

    def image_url
       path = rails_blob_path(self.avatar, only_path: true)
    #    "http://localhost:3000#{path}"
     "https://sum-trip-travel-journal.onrender.com#{path}"
    end

end
