class Api::QuestionsController < Api::ApiController

  def create
    @question = Question.new(question_params)
    if @question.save
      render json: @question
    else
      render json: nil, status: :unprocessable_entity
    end
  end

  def show
    @question = Question.find(params[:id])
    render json: @post
  end

  def index
    @questions = Question.all
    render json: @questions
  end

  def destroy
    @question = Question.find(params[:id])
    @question.destroy
    render json: @question
  end

  def question_params
    params[:question].permit(:title, :content)
  end

end
