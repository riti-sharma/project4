class GroupsController < ApplicationController

  def index
    @groups = Group.all
    render json: @groups, include: :users, status: :ok
  end

  def show
    @user = User.find(params[:user_id])
    @group = Group.find(params[:id])
    render json: @group, include: :user, status: :ok
  end

  def create
    @group = Group.new(group_params)
    if @group.save
    redirect_to @group
    end
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      render json: @group, status: :ok
    else
      render json: { errors: @group.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @group = Group.find(params[:id])
    @group.destroy
    head 204
  end

  private
  def group_params
    params.require(:group).permit(:name, :description, :user_id)
  end


end