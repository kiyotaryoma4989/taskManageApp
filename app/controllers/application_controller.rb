class ApplicationController < ActionController::Base
  helper_method :current_user

  def current_user
    @current_user ||= User.find_by(id: session[:id]) if session[:id]
  end

  def authenticate_user!
    redirect_to login_path, alert: "ログインしてください" unless current_user
  end
end
