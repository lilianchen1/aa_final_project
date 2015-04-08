class Api::QuestionsController < Api::ApiController
  wrap_parameters :question, include: [:title, :content, :tag_list]

  def create
    @question = current_user.questions.new(question_params)
    if @question.save
      render :show
    else
      render json: nil, status: :unprocessable_entity
    end
  end

  def show
    @question = Question.includes(:user, :answers).find(params[:id])
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
    params[:question].permit(:title, :content, :tag_list)
  end

end
