class TodosController < ApplicationController
    protect_from_forgery with: :null_session

  def index
    @todos = Todo.order(updated_at: :asc)
  end

  def new
    @todo = Todo.new
  end

  def create
    # @todo = Todo.new(todo_params.merge(user_id: current_user_id))
    @todo = Todo.new(todo_params.merge(user_id: 1))
    if @todo.save
      render json: { todo: @todo }, status: :created
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
      redirect_to todos_path, notice: "更新しました"
    else
      render :edit
    end
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
    redirect_to todos_path, notice: "削除しました"
  end

  private

  def todo_params
    params.require(:todo).permit(:title,:description,:dueDate,:category,:priority,:tags,:done)
  end
end
