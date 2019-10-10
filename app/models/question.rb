class Question < ApplicationRecord
	self.inheritance_column = 'not_sti'
	belongs_to :mapping
  belongs_to :role

  enum teaming_stage: { norming: 'Norming', forming: 'Forming', performing: 'Performing', all_stages: 'All' }
  enum type: { rating_scale: "Rating scale", others: "Other"}
  enum condition: { always: "Always", rare: "Rare", medium: "Medium" }
end
