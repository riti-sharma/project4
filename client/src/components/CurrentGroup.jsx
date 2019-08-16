import React, { Component } from 'react'
import { readPosts, createPost, updatePost, removePostfromGroup } from '../services/api-helper';

export default class CurrentGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      postForm: {
        title: "",
        message: ""
      },
      putForm: {
        title: '',
        message: ''
      },
      isEditing: null
    }
  }

  componentDidMount() {
    this.getPosts(this.props.groupId)
  }

  getPosts = async (groupId) => {
    const posts = await readPosts(groupId)
    this.setState({
      posts: posts
    })
  }

  newPost = async (groupId) => {
    const post = await createPost(groupId, this.state.postForm);
    this.setState(prevState => ({
      posts: [...prevState.posts, post],
      postForm: {
        title: "",
        message: ""
      }
    }))
  }
  handleFormChange = (e, form) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      [form]: {
        ...prevState[form], [name]: value
      }
    }))
  }

  handlePostDelete = async (postId) => {
    await removePostfromGroup(this.props.groupId, postId)
    this.setState(prevState => ({
      posts: prevState.posts.filter(post => post.id !== parseInt(postId))
    }))
  }

  editPost = async () => {
    const { putForm } = this.state
    const newPost = await updatePost(putForm.id, putForm);
    this.setState(prevState => (
      {
        posts: prevState.posts.map(post => post.id === putForm.id ? newPost : post)
      }
    ))
  }


  render() {
    return (
      <div className="currentGroup">

        <div className="grouptitle">
          <h3>{this.props.currentGroup.name}</h3>
          <p>{this.props.currentGroup.description}</p>
        </div>

        <div className="Posts">
          {this.state.posts && this.state.posts.map(post => (
            <div key={post.id}>
              {this.state.isEditing === post.id ?
                <form onSubmit={(e) => {
                  e.preventDefault();
                  this.editPost();
                  this.setState({
                    isEditing: null
                  })
                }}>
                  <input
                    name='title'
                    type='text'
                    value={this.state.putForm.title}
                    onChange={(e) => this.handleFormChange(e, "putForm")}
                  />
                  <input
                    name='message'
                    type='text'
                    value={this.state.putForm.message}
                    onChange={(e) => this.handleFormChange(e, "putForm")}
                  />
                  <button>Submit Button</button>
                </form>
                :
                <>
                  <h4>{post.title}</h4>
                  <p>{post.message}</p>
                  <button onClick={() => this.handlePostDelete(post.id)}>Delete</button>
                  <button onClick={() => {
                    this.setState({
                      isEditing: post.id,
                      putForm: post
                    })
                  }}>Edit</button>
                </>
              }
            </div>
          ))}

        </div>

        <hr />
        <form onSubmit={(e) => {
          e.preventDefault();
          this.newPost(this.props.groupId)
        }}>
          <p>Title</p>
          <input
            name="title"
            type="text"
            value={this.state.postForm.title}
            onChange={(e) => this.handleFormChange(e, "postForm")}
          />
          <p>Message</p>
          <input
            name="message"
            type="text"
            value={this.state.postForm.message}
            onChange={(e) => this.handleFormChange(e, "postForm")}
          />
          <button>Add a post</button>
        </form>
      </div>
    )
  }
}
