class TodosController < ApplicationController
    before_action :authenticate_user!
    protect_from_forgery with: :null_session

  def index
    @todos = Todo.active.where(user_id: current_user.id).order(updated_at: :desc)
    @notCompletedCount = Todo.active.where(user_id: current_user.id, done: false).count
    @completedCount = Todo.active.where(user_id: current_user.id, done: true).count
    @categories = Category.all()
    total = @completedCount + @notCompletedCount
    if total.zero?
      @progress = 0
    else
      @progress = ((@completedCount.to_f / total) * 100).round(0)
    end
  end

  def new
    @todo = Todo.new
  end

  def create
    @todo = Todo.new(todo_params.merge(user_id: current_user.id))
    if @todo.save
      render json: { todo: @todo.as_json(include: { category: { only: [:id, :name] } }) }, status: :created
    else
      render json: { error: @todo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def edit
    @todo = Todo.find(params[:id])
  end

  def update
    @todo = Todo.find(params[:id])
    if @todo.update(todo_params)
      render json: { todo: @todo.as_json(include: { category: { only: [:id, :name] } }) }, status: :ok
    else
      render json: { error: @todo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update_done
    @todo = Todo.find(params[:id])
    if @todo.update(done: params[:done])
      render json: { success: true, todo: @todo }, status: :ok
    else
      render json: { success: false, errors: @todo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update_delete_flg
    @todo = Todo.find(params[:id])
    if @todo.update(delete_flg: params[:delete_flg])
      render json: { success: true, todo: @todo }, status: :ok
    else
      render json: { success: false, errors: @todo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
    redirect_to todos_path, notice: "削除しました"
  end

  private

  def todo_params
    params.require(:todo).permit(:title,:description,:due_date,:category_id,:priority,:tags,:done)
  end
end
