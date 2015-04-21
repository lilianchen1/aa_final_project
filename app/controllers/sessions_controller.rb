class SessionsController < ApplicationController

  before_action :logged_in?, only: [:new, :create]

  def new
    render :new
  end

  def create
    user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if user.nil?
      flash.now[:errors] = ["Wrong Credentials"]
      render :new
    else
      login(user)
      redirect_to root_url
    end
  end

  def destroy
    session = Session.find(params[:id])
    if session.user_id == Session.find_by_session_token(session[:session_token]).user_id
      session[:session_token] = nil
      session.destroy
      redirect_to new_session_url
    else
      flash[:notice] = "Session logged out"
      session.destroy
      redirect_to :back
    end

  end

  private

  def logged_in?
    redirect_to root_url if current_user
  end

end
