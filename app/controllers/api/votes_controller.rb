class Api::VotesController < Api::ApiController

  def create
    @votable = find_votable
    @vote = @votable.votes.build(vote_params)
    @vote.user_id = current_user.id
    if @vote.save
      render :show
    else
      render json: @vote.errors.full_messages, status: :unprocessable_entity
    end
  end


  def destroy
    @vote = Vote.find(params[:id])
    @vote.destroy
    render json: @vote
  end


  def find_votable
    params.each do |name, value|
      if name =~ /(.+)_id$/
        return $1.classify.constantize.find(value)
      end
    end
    nil
  end

  def vote_params
    params[:vote].permit(:votable_id, :votable_type, :value)
  end
end
