import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
  // Component State Hook
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password} = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})
        // The ...formData is a spreader and copies the formData
        // [e.target.name] corresponding to "name" attribute (not the value) of each HTML tags
        // e.target.value -- is the change in value in the fields

  //Subit function form
  const onSubmit = e => {
    e.preventDefault();
      console.log('SUCCESS')
  
  }
  
  return (
    <Fragment>
     {/*<div className="alert alert-danger">
        Invalid credentials 
      </div>*/}
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={e=> onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email} 
            onChange={e => onChange(e)} 
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} 
            onChange={e => onChange(e)} 
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  )
}
