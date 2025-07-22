class Todo < ApplicationRecord
  scope :active, -> { where(delete_flg: false) }
  belongs_to :category, optional: true
  belongs_to :user
end
