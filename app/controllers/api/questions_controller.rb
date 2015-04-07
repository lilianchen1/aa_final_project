class Api::QuestionsController < Api::ApiController

  def create
    @question = current_user.questions.new(question_params)
    if @question.save
      render json: @question
    else
      render json: nil, status: :unprocessable_entity
    end
  end

  def show
    @question = Question.includes(:user).find(params[:id])
    # render json: @post
    #jbuilder with current_user
    render :show
  end

  def index
    @questions = Question.all
    render :index
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
