import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = (props) => {

  return (
    <div className="LoginForm">
      <h2>Login</h2>

      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin();
      }} >
        <p>Username:</p>
        <input name="name" type="text" value={props.formData.name} onChange={props.handleChange} />
        <p>Password:</p>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />

        <button>Login</button>
        <Link to="/register"><button>Register</button></Link>
      </form>
    </div>
  );
}

export default LoginForm;
