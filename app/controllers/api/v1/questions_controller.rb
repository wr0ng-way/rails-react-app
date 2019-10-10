# frozen_string_literal: true

class Api::V1::QuestionsController< ApplicationController
  before_action :set_question, only: %i[update destroy]

  def index
    render json: Question.all
  end

  def create
    question = Question.new(question_params)
    if question.save
      render json: question
    else
      render json: { success: false, message: question.errors.full_messages }
    end
  end

  def destroy
    if @question.destroy
      render json: @question
    else
      render josn: { success: false, message: @question.errors.full_messages }
    end
  end

  def update
    if @question.update(question_params)
      render json: @question
    else
      render josn: { success: false, message: @question.errors.full_messages }
    end
  end

  private

  def question_params
    out = params.require(:question).permit(:id, :text, :type)
    out.merge(pri: 1, teaming_stages: 'Norming',
              appears: 1, frequency: 50, required: false,
              conditions: 'rare', role_id: 1, mapping_id: 1)
    out
  end

  def set_question
    @question = Question.find(params[:id])
  end
end
