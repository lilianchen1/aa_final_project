class Api::TagsController < Api::ApiController

  def index
    @tags = Tag.joins(:questions).where('questions.id IS NOT NULL').order(:name).page(params[:page]).per(10)
    render :index
  end

  def show
    @tag = Tag.find(params[:id])
    @questions = @tag.questions
    render :show
  end
end
