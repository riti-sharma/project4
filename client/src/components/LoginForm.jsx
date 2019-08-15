import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = (props) => {

  return (
    <div className="LoginForm">
      <h2>Login</h2>
      <hr />
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin();
      }} >
        <p>Username:</p>
        <input name="name" type="text" value={props.formData.name} onChange={props.handleChange} />
        <p>Password:</p>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        <hr />
        <button>Login</button>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
}

export default LoginForm;
