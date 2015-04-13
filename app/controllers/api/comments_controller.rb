class Api::CommentsController < Api::ApiController

  def create
    @commentable = find_commentable
    @comment = @commentable.comments.build(comment_params)
    @comment.user_id = current_user.id
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end


  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render json: @comment
  end


  def find_commentable
    params.each do |name, value|
      if name =~ /(.+)_id$/
        return $1.classify.constantize.find(value)
      end
    end
    nil
  end

  def comment_params
    params[:comment].permit(:commentable_id, :commentable_type, :content)
  end

end
