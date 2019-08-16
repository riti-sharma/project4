import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import Nav from './components/Nav';
import MyGroups from './components/MyGroups';
import AllGroups from './components/AllGroups';
import Header from './components/Header';
import Footer from './components/Footer';
import CurrentGroup from './components/CurrentGroup'
import { loginUser, createGroup, registerUser, joinGroups, verifyUser, readAllGroups, readPosts, removeGroupFromUser, createPost, removeGroup } from './services/api-helper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      groups: [],
      mygroups: [],
      currentGroup: {
        subject: "",
        description: ""
      },
      createGroupData: {
        subject: "",
        description: ""
      },
      formData: {
        name: "",
        email: "",
        password: ""
      },
      groupForm: {
        name: "",
        description: ""
      },
    }
  }

  async componentDidMount() {
    this.getAllGroups();
    this.getUserData();
  }

  getUserData = async () => {
    const user = await verifyUser();
    if (user) {
      this.setState({
        currentUser: user
      })
      console.log(this.state.currentUser);
    }
  }

  joinGroup = async (group) => {
    const join = await joinGroups(this.state.currentUser.id, group.id);
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        groups: [...prevState.currentUser.groups, join]
      }
    }))
    this.props.history.push("/mygroups")
  }

  handleLogin = async () => {
    const userData = await loginUser(this.state.formData);
    this.setState({
      currentUser: userData
    })
    this.props.history.push("/home");
  }


  handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(this.state.formData);
    const userData = await loginUser(this.state.formData);
    this.setState({
      currentUser: userData
    })
    this.handleLogin();
    this.props.history.push("/home")
  }


  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  }

  handleLoginButton = () => {
    this.props.history.push("/login")
  }

  handleLogout = () => {
    localStorage.removeItem("authToken");
    this.setState({
      currentUser: null
    })
    this.props.history.push("/login")
  }

  getAllGroups = async () => {
    const groups = await readAllGroups();
    this.setState({
      groups: groups
    })
  }

  handleGroupDelete = async (e) => {
    e.preventDefault();
    const groupID = e.target.name
    await removeGroupFromUser(this.state.currentUser.id, groupID)
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        groups: prevState.currentUser.groups.filter(group => group.id !== parseInt(groupID))
      }
    }))
  }

  handleDelete = async (groupId) => {
    await removeGroup(groupId);
    this.setState(prevState => ({
      groups: prevState.groups.filter(group => group.id !== parseInt(groupId)),
      currentUser: {
        ...prevState.currentUser,
        groups: prevState.currentUser.groups.filter(group => group.id !== parseInt(groupId))
      }
    }))
  }

  newGroup = async (e) => {
    e.preventDefault();
    const group = await createGroup(this.state.groupForm);
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        groups: [...prevState.currentUser.groups, group]
      },
      groups: [...prevState.groups, group],
      mygroups: [...prevState.mygroups, group],
      groupForm: {
        name: "",
        description: ""
      }
    }))
    this.props.history.push("/mygroups")
  }

  handleGroupFormChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      groupForm: {
        ...prevState.groupForm, [name]: value
      }
    }))
  }

  getGroupInfo = async (groupId) => {
    const currentGroup = this.state.find(group => group.id === groupId)
  }


  render() {
    return (
      <div className="App">
        {this.state.currentUser !== null &&
          < Nav
            handleLogout={this.handleLogout} />
        }
        <Header />

        <Route exact path="/home" render={() => (
          <Home
            groupForm={this.state.groupForm}
            handleGroupFormChange={this.handleGroupFormChange}
            newGroup={this.newGroup}
            createGroupData={this.state.createGroupData}

          />
        )} />

        <Route exact path="/login" render={() => (
          <LoginForm
            formData={this.state.formData}
            handleChange={this.handleChange}
            handleLogin={this.handleLogin}
          />)} />

        <Route exact path="/register" render={() => (
          <RegisterForm
            formData={this.state.formData}
            handleChange={this.handleChange}
            handleRegister={this.handleRegister}
          />)} />

        <Route exact path="/allgroups" render={() => (
          <AllGroups
            handleDelete={this.handleDelete}
            groups={this.state.groups}
            joinGroup={this.joinGroup}
            currentUser={this.state.currentUser}
          />
        )} />

        <Route exact path="/mygroups" render={() => (
          <MyGroups
            mygroups={this.state.mygroups}
            handleGroupDelete={this.handleGroupDelete}
            currentUser={this.state.currentUser}
            handleDelete={this.handleDelete}
          />
        )} />

        <Route exact path="/currentgroup/:id" render={(props) => {
          if (this.state.currentUser) {
            const groupId = props.match.params.id;
            const currentGroup = this.state.currentUser.groups.find(group => group.id === parseInt(groupId))
            return < CurrentGroup
              groupId={groupId}
              getGroupInfo={this.getGroupInfo}
              currentGroup={currentGroup}
              newPost={this.newPost}
              currentUser={this.state.currentUser}
            />
          }
        }} />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
