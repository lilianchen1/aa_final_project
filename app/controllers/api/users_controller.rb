class Api::UsersController < Api::ApiController

  def index
    if params[:query].present?
      @users = User.where("username ~ ?", params[:query])
                   .order('LOWER(username)').page(params[:page]).per(10)
      render :index
    else
      @users = Kaminari::paginate_array(
        User.order('LOWER(username)').to_a
      ).page(params[:page]).per(10)
      render :index
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render @user
  end

end
