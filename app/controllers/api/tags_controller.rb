class Api::TagsController < Api::ApiController
  def show
    @tag = Tag.find(params[:id])
    @questions = @tag.questions
    render :show
  end
end
