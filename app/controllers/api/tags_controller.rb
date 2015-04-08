class Api::TagsController < Api::ApiController

  def index
    @tags = Tag.all
    render :index
  end

  def show
    @tag = Tag.find(params[:id])
    @questions = @tag.questions
    render :show
  end
end
