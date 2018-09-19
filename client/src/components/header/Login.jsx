import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      errorBasic: '',
      errorAuth: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.authHandler = this.authHandler.bind(this);
  }

  authHandler(provider) {
    this.props.oAuthLogin(provider)
     .then((data) => {
      console.log(data)
     })
     .catch((err) => {
      console.log(err)
      this.setState({
        errorAuth : err.message
      })
     })
  }

  clickHandler(email, password) {
    if(email && password){
      this.props.onLogin(email, password)
        .then((data) => {
          $(this.modal).modal('hide');
        })
        .catch((err) => {
          console.log(err.message)
          this.setState({
            errorBasic : err.message
          })
        })
    } else {
      this.setState({
        errorBasic : 'Enter email & password'
      })
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
      [evt.target.password]: evt.target.value,
      errorBasic : '',
      errorAuth: ''
    })
  }

  render() {
    return (
      // button for Login and Register
      <div className="wrapper">
        {/* Creates button for Login */}
        <div className="container">
          <a className="loginbtn" id="auth-btn" data-toggle="modal" data-target="#elegantModalForm" >Log In</a>
        </div>
        {/* MODAL: Creates popup for Login */}
        <div className="modal fade" ref={modal => this.modal = modal} id="elegantModalForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content form-elegant">
              {/* MODAL: header */}
              <div className="modal-header text-center">
                {/* Creates close button for popup */}
                <h4 className="modal-title w-100 dark-grey-text font-weight-bold my-3" id="myModalLabel"><strong>Login With</strong></h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              {/* MODAL: Body */}
              <div className="modal-body mx-4">
                <form>
                <div className="input-group md-form  mb-3">
                <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span><input type="text" id="Form-email-login" className="form-control validate" autoComplete="current-email" placeholder="Email address" name="email" onChange={this.handleChange}/>
                  <label data-error="wrong" data-success="right" placeholder="Email address"></label>
                </div>
                <div className="input-group md-form pb-3">
                <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span><input type="password" id="Form-pass-login" className="form-control validate" autoComplete="current-password" placeholder="Password" name="password" onChange={this.handleChange}/>
                    <label data-error="wrong" data-success="right"></label>
                </div>
                <div>
                  {this.state.errorBasic}
                </div>
                <div className="text-center mb-3">
                    {/* Button to make post request */}
                    <button type="button" className="btn blue-gradient btn-block btn-rounded z-depth-1a hoverable" 
                      onClick={this.clickHandler.bind(this, this.state.email, this.state.password)} aria-hidden="true">Sign in
                    </button>
                </div>
                <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign in with:</p>
                <div>
                  {this.state.errorAuth}
                </div>
                <div className="row my-3 d-flex justify-content-center">
                    {/* Button to Login with google*/}
                    <div className="loginOptions">
                      <button type="button" className="btn btn-white btn-rounded z-depth-1a loginButton" onClick={this.authHandler.bind(this, new firebase.auth.GoogleAuthProvider())} aria-hidden="true">
                        <i className="fa fa-google-plus"></i>
                      </button>
                    </div>
                    {/* Button to Login with facebook*/}
                    <div className="loginOptions">
                      <button type="button" className="btn btn-white btn-rounded z-depth-1a loginButton" onClick={this.authHandler.bind(this, new firebase.auth.FacebookAuthProvider())} aria-hidden="true">
                        <i className="fa fa-facebook"></i>                    
                      </button>
                    </div>
                    {/* Button to Login with google*/}
                    <div className="loginOptions">
                      <button type="button" className="btn btn-white btn-rounded z-depth-1a loginButton" onClick={this.authHandler.bind(this, new firebase.auth.GithubAuthProvider())} aria-hidden="true">
                        <i className="fa fa-github"></i>
                      </button>  
                    </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;