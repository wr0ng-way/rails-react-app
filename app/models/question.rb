class Question < ApplicationRecord
	self.inheritance_column = 'not_sti'
  self.per_page = 10
	belongs_to :mapping
  belongs_to :role
end
