class Api::TagsController < Api::ApiController

  def index
    if params[:query].present?
      @tags = Tag.joins(:questions)
                 .where("questions.id IS NOT NULL AND name ~ ?", params[:query])
                 .order(:name).page(params[:page]).per(15)
      render :index
    else
      @tags = Tag.joins(:questions).where('questions.id IS NOT NULL').order(:name).page(params[:page]).per(20)
      render :index
    end
  end

  def show
    @tag = Tag.find(params[:id])
    @questions = @tag.questions
    render :show
  end
end
