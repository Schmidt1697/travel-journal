class Like < ApplicationRecord
  belongs_to :user
  belongs_to :trip

  validates :user_id, :trip_id, presence: true
  validates :user_id, uniqueness: { scope: :trip_id }

end
