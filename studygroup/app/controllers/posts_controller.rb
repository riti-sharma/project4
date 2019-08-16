class PostsController < ApplicationController
  before_action :authorize_request, only: [:create]

  def index
    @group = Group.find(params[:group_id])
    render json: @group.posts, status: :ok
  end

  def show
    @group = Group.find(params[:group_id])
    @user = User.find(params[:user_id])
    @post = Post.find(params[:id])
    render json: @post, include: [:group, :user], status: :ok
  end

  def create
    @group = Group.find(params[:group_id])
    @post = Post.new({ **post_params.as_json.symbolize_keys, group: @group})
    @post.user = @current_user
    @post.group = @group
    if @post.save
      render json: @post
    end
  end

  def update
    @post = Post.find(params[:id])
    if params[:group_id]
      @group = Group.find(params[:group_id])
      @group.post << @post
      render json: @post
    elsif @post.update(post_params)
        render json: @post, status: :ok
    else
      render json: { errors: @post.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    head 204
  end

  private

  def post_params
    params.require(:post).permit(:title, :message, :group_id, :user_id)
  end

end
