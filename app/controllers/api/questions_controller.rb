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
      @questions = Kaminari::paginate_array(
        Question.search_result(params[:query]).to_a
      ).page(params[:page]).per(7)
      render :index

    elsif params[:sort].present?
      @questions = Kaminari::paginate_array(
        Question.sort_by_popularity.to_a
      ).page(params[:page]).per(7)
      render :index
    elsif params[:unanswered].present?
      @questions = Kaminari::paginate_array(
        Question.unanswered.to_a
      ).page(params[:page]).per(50)
      render :index
    else
      @questions = Question.order('questions.created_at DESC').page(params[:page]).per(7)
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
