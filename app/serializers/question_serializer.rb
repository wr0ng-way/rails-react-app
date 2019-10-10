class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :text, :type, :teaming_stage, 
             :appears, :frequency, :required, 
             :condition, :mapping, :role

  def mapping
    self.object.mapping.name
  end

  def required
    object.required ? 'Yes' : 'No'
  end

  def role
   self.object.role.name
  end 
end

