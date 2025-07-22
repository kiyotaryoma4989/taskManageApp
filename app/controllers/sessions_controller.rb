class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(user_id: params[:user_id])

    if user && user.authenticate(params[:password])
      session[:id] = user.id
      session[:user_id] = user.user_id
      redirect_to "/todos", notice: "ログイン成功"
    else
      redirect_to root_path, notice: "ログイン失敗"
    end
  end

  def destroy
    session[:id] = nil
    session[:user_id] = nil
    redirect_to root_path, notice: "ログアウトしました"
  end
end
