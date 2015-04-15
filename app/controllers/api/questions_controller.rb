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
    if params[:query].present?
      @questions = Question.where("title ~ ? OR content ~ ?", params[:query], params[:query])
                           .order('questions.created_at DESC').page(params[:page]).per(10)
      render :index
    else
      @questions = Question.order('questions.created_at DESC').page(params[:page]).per(10)
      render :index
    end
  end

  def update
    @question = Question.find(params[:id])
    if @question.update(question_params)
      render :show
    else
      render json: nil, status: :unprocessable_entity
    end
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
