import React, { Component } from 'react'
import './register.css'

class Register extends Component {

  constructor(props) {
    super(props) 
      this.state = {
        email: '',
        password: '',
        name: ''
      }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email : event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password :event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('https://obscure-sands-73955.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.id){
        this.props.loadUser(user)
        this.props.onRouteChange('home');
      }
    })
  }


  render() {
    return(
      <article className=" dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center neo-back-main">
        <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 white">Create Account</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6 light-gray" htmlFor="email-address">name</label>
              <input 
                  onChange = {this.onNameChange}
                  className="pa2 input-reset  bg-transparent  light-gray w-150 neo-back " 
                  type="text" 
                  name="name"  
                  id="name" />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6 light-gray" htmlFor="email-address">Email</label>
              <input 
                
                  className="pa2 input-reset  bg-transparent  light-gray w-150 neo-back " 
                  type="email" 
                  name="email-address"  
                  id="email-address" 
                  onChange = {this.onEmailChange}
                  />
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
        </div>
      </main>            
      </article>
    )
  }
}

export default Register