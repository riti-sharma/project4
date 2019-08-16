import React from 'react';
import { Link } from 'react-router-dom'


const RegisterForm = (props) => {

  return (
    <div className="RegisterForm">
      <h2>Register</h2>

      <form onSubmit={props.handleRegister} >
        <p>Username:</p>
        <input name="name" type="text" value={props.formData.name} onChange={props.handleChange} />
        <p>Email:</p>
        <input name="email" type="text" value={props.formData.email} onChange={props.handleChange} />
        <p>Password:</p>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />

        <button>Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;