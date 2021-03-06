class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  def current_user
    return nil if session[:session_token].nil?
    return nil if Session.find_by_session_token(session[:session_token]).nil?
    @current_user ||= Session.find_by_session_token(session[:session_token]).user
  end

  def login(user)
    @session = Session.create(user: user,
      session_token: SecureRandom::urlsafe_base64
    )

    @current_user = user
    session[:session_token] = @session.session_token
  end

  def require_signin
    redirect_to new_session_url if current_user.nil?
  end
end
