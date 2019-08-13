class PostsController < ApplicationController
  def index
    @posts = Post.all
    render json: @posts, status: :ok
  end

  def show
    @group = Group.find(params[:group_id])
    @user = User.find(params[:user_id])
    @post = Post.find(params[:id])
    render json: @post, include: :group, include: :user, status: :ok
  end

  def create
    @post = Post.new(post_params)
    if @post.save
    redirect_to @post
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
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
