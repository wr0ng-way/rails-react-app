class Role < ApplicationRecord
	has_many :questions, dependent: :destroy

	enum name: { admin: "Admin", user: "User", both: "Both" }
end
