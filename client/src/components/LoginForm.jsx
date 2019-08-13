import React from 'react';

export default (props) => (
  <>
    <div className="Loginform">
      <h3>Log In Form</h3>
      <form className="log">
        <label htmlFor="name">Username</label>
        <input type="text"
          name="name"
          id="name"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"

          id="password"
        />

        <input type="submit" value="Sign In!" />
      </form>
    </div>
  </>
)
