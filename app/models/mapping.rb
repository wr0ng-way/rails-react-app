class Mapping < ApplicationRecord
	has_many :questions, dependent: :destroy
end
