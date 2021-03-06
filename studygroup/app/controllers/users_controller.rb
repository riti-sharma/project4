class UsersController < ApplicationController
  
  before_action :authorize_request, except: :create

  def index
    @users = User.all
    render json: @users, include: [:groups, :posts], status: :ok
  end


  def show
    @user = User.find(params[:id])
    render json: @user, include: [:groups, {groups: {include: [:posts]}}], status: :ok
  end

  def create
    @user = User.new(user_params)
    if @user.save
    render json: @user
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: @user, status: :ok
    else
      render json: { errors: @user.errors }, status: :unprocessable_entity
    end
  end

  def verify
    @groups = Group.all
    @user = {
      id: @current_user[:id],
      name: @current_user[:name],
      email: @current_user[:email],
      groups: @current_user.groups,
      myGroups: @groups.select{|group| group.users[0].id === @current_user.id}
    }

    render json: @user
  end

  private
  def user_params
    params.require(:user).permit(:name, :grade, :email, :password)
  end

end