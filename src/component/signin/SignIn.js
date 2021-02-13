import userEvent from '@testing-library/user-event';
import React, { Component } from 'react';
import './signin.css'


class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      signInEmail : '',
      signInPassword : '',
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('https://obscure-sands-73955.herokuapp.com/signin', {
      method: 'post',
      headers : {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.id){
        this.props.loadUser(user);
        this.props.onRouteChange('home')
      }
    })
  }

  render () {
  const {onRouteChange} = this.props
    return (
        <article className=" dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center neo-back-main">
        <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 white">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6 light-gray" htmlFor="email-address">Email</label>
              <input 
              onChange={this.onEmailChange}
              className="pa2 input-reset  bg-transparent  light-gray w-150 neo-back " 
              type="email" 
              name="email-address"  
              id="email-address" />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6 light-gray" htmlFor="password">Password</label>
              <input 
                onChange={this.onPasswordChange}
                className="b pa2 input-reset  bg-transparent light-gray hover-white w-150 neo-back" 
                type="password" 
                name="password"  
                id="password" />
            </div>
          </fieldset>
          <div className="">
            <input onClick={this.onSubmitSignIn} 
            className=" ph3 pv2 input-reset  bg-transparent grow pointer f6 dib light-gray neo-back-button" 
            type="submit" 
            value="Sign in" />
          </div>
          <div className="lh-copy mt3">
            <p onClick={() => onRouteChange('register')} className="f6 link dim black db light-gray pointer">Register</p>
          </div>
        </div>
      </main>            
    </article>
   )
  }
}


export default SignIn