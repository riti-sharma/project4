class AuthenticationController < ApplicationController
  def login
    @groups = Group.all
    @user = User.find_by_name(params[:name])
    p @user
    if @user.authenticate(params[:password]) #authenticate method provided by Bcrypt and 'has_secure_password'
      token = encode(user_id: @user.id, name: @user.name)
      render json: { token: token, user: {id: @user.id, name: @user.name, groups: @user.groups,
      myGroups: @groups.select{|group| group.users[0].id === @current_user.id} } }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  private

  def login_params
    params.permit(:name, :password)
  end
end
