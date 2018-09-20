import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      errorBasic: '',
      errorAuth: ''
    }

    this.emailLogin = this.emailLogin.bind(this);
    this.oAuthLogin = this.oAuthLogin.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.emailClickHandler = this.emailClickHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkifUserExistsinUserTable = this.checkifUserExistsinUserTable.bind(this);
  }  

  checkifUserExistsinUserTable(idToken){
    return axios.get('/retire/users', { params: { idToken: idToken } })
    .then(({ data }) => {
      this.props.updateUserState(data.oAuthId, data.fullname, data.username, data.email);
    })
  }

  //for OAuth login
  //check if 
  oAuthLogin (provider) {
    return firebase.auth().signInWithPopup(provider)
     .then((authData) => {
      $(this.modal).modal('hide');
      return firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => {
        return this.checkifUserExistsinUserTable(idToken)
      })
     })
  }
  
  authHandler(provider) {
    this.oAuthLogin(provider)
     .then((data) => {
     })
     .catch((err) => {
       var error;
        console.log(err)
        if(err.message === 'Request failed with status code 404'){
          error = 'Invalid login';
        } else {
          error = err.message;
        }
        this.setState({
          errorAuth : error
        })
     })
  }

  //for local login
  emailLogin (email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((authData) => {
        return firebase.auth().currentUser.getIdToken(true)
        .then((idToken) => {
          return this.checkifUserExistsinUserTable(idToken)
        })
      })
  }

  emailClickHandler(email, password) {
    if(email && password){
      this.emailLogin(email, password)
        .then((data) => {
          // $(this.modal).modal('hide');
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

  closeModal(){
    this.setState({
      email: '',
      password: '',
      errorBasic: '',
      errorAuth: ''
    })
    $(this.modal).modal('hide');
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
        <div className="modal fade" ref={modal => this.modal = modal} id="elegantModalForm" data-keyboard="false" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content form-elegant">
              {/* MODAL: header */}
              <div className="modal-header text-center">
                {/* Creates close button for popup */}
                <h4>Login</h4>
                <button type="button" className="close" onClick={this.closeModal} aria-hidden="true">&times;</button>
              </div>
              {/* MODAL: Body */}
              <div className="modal-body mx-4">
                <form>
                <div className="input-group md-form  mb-3">
                <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
                  <input type="text" value={this.state.email} id="Form-email-login" className="form-control validate" autoComplete="current-email" placeholder="Email address" name="email" onChange={this.handleChange}/>
                  <label data-error="wrong" data-success="right" placeholder="Email address"></label>
                </div>
                <div className="input-group md-form pb-3">
                <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
                  <input type="password" value={this.state.password} id="Form-pass-login" className="form-control validate" autoComplete="current-password" placeholder="Password" name="password" onChange={this.handleChange}/>
                    <label data-error="wrong" data-success="right"></label>
                </div>
                <div>
                  {this.state.errorBasic}
                </div>
                <div className="text-center mb-3">
                    {/* Button to make post request */}
                    <button type="button" className="btn blue-gradient btn-block btn-rounded z-depth-1a hoverable" 
                      onClick={this.emailClickHandler.bind(this, this.state.email, this.state.password)} aria-hidden="true">Login
                    </button>
                </div>
                <div className="modal-header text-center">
                {/* Creates close button for popup */}
                <h4>Or Login With:</h4>
              </div>
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
                    {/* Button to Login with github*/}
                    <div className="loginOptions">
                      <button type="button" className="btn btn-white btn-rounded z-depth-1a loginButton" onClick={this.authHandler.bind(this, new firebase.auth.GithubAuthProvider())} aria-hidden="true">
                        <i className="fa fa-github"></i>
                      </button>  
                    </div>
                    {/* Button to Login with twitter*/}
                    <div className="loginOptions">
                      <button type="button" className="btn btn-white btn-rounded z-depth-1a loginButton" onClick={this.authHandler.bind(this, new firebase.auth.TwitterAuthProvider())} aria-hidden="true">
                        <i className="fa fa-twitter"></i>
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