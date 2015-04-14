class Api::TagsController < Api::ApiController

  def index
    @tags = Tag.order(:name).page(params[:page]).per(10)
    render :index
  end

  def show
    @tag = Tag.find(params[:id])
    @questions = @tag.questions
    render :show
  end
end
