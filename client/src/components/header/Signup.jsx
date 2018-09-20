import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      fullname: '',
      email: '',
      errorEmail: '',
      dupUser: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.emailAndPassAuth = this.emailAndPassAuth.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.emailSignUp = this.emailSignUp.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  //create user
  createUser(idToken, fullname, email, username){
    if(!username) username = email;
    debugger;
    return axios.post('/retire/users', { idToken, fullname, email, username });
  }

  //for OAuth signup
  authHandler (provider) {
    firebase.auth().signInWithPopup(provider)
    .then((authData) => {
      this.closeModal();
      firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => {
        this.createUser(idToken, authData.additionalUserInfo.profile.name, authData.additionalUserInfo.profile.email, authData.additionalUserInfo.username)
        .then(({data})=> {
          console.log(data);
          if(data == 'USER ALREADY EXISTS IN DB') {
            this.setState({
              dupUser : true
            })
          } else {
            if(!authData.additionalUserInfo.username) authData.additionalUserInfo.username = authData.additionalUserInfo.profile.email;
            this.props.updateUserState(idToken,authData.additionalUserInfo.username,authData.additionalUserInfo.profile.name,authData.additionalUserInfo.profile.email);
          }
        })
        .catch((err) => {
          console.log(err);
        })

      })
      .catch((err) => {
        console.log(err);
      })
    })
    .catch((err) => console.error(err));
  }

  //for local signup
  emailSignUp (email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        return firebase.auth().currentUser.getIdToken(true)
      })
  }

  emailAndPassAuth(e) {
    e.preventDefault();
    if(this.state.username !== '' && this.state.password !== '' && this.state.fullname !== '' && this.state.email) {
      this.emailSignUp(this.state.email, this.state.password)
      .then((idToken)=> {
        this.createUser(idToken, this.state.fullname, this.state.email, this.state.username);
      })
      .catch((err) => {
        this.setState({
          errorEmail: err.message
        })
      })
    } else {
      this.setState({
        errorEmail : 'Please enter all fields.'
      })
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
      errorEmail : ''
    })
  }

  closeModal(){
    $(this.modal).modal('hide');
    this.setState({
      username: '',
      password: '',
      fullname: '',
      email: '',
      errorEmail: '',
      dupUser: false
    })
  }

  render() {
    return (
      // button for Register
      <div className="wrapper pt-2">
        {/* Creates button for SignUp */}
          <a className="btn clr py-2" id="auth-btn" data-toggle="modal" data-target="#signUp" >Sign Up</a>
        <div className="container">
        </div>
        {/* MODAL: Creates popup for SignUp */}
        <div className="modal fade" ref={modal => this.modal = modal} id="signUp" data-keyboard="false" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content form-elegant">
              {/* MODAL: header */}
              <div className="modal-header text-center">
                {/* Creates close button for popup */}
                <h4>Sign Up With Email</h4>
                <button type="button" className="close" onClick={this.closeModal} aria-hidden="true">&times;</button>
              </div>
              <form>
              {/* MODAL: Body */}
                <div className="modal-body mx-4">
                <div className="md-form pb-1">
                    <label data-error="wrong" data-success="right" htmlFor="Form-username-signup">Email</label>
                    <input type="username" value={this.state.email} className="form-control validate" name="email" onChange={this.handleChange}/>
                  </div>
                  <div className="md-form pb-1">
                    <label data-error="wrong" data-success="right" htmlFor="Form-pass-signup">Password</label>
                    <input type="password" value={this.state.password} className="form-control validate" autoComplete="current-password" name="password" onChange={this.handleChange}/>
                  </div>
                  <div className="md-form pb-1">
                    <label data-error="wrong" data-success="right" htmlFor="Form-username-signup">Username</label>
                    <input type="username" value={this.state.username} className="form-control validate" name="username" onChange={this.handleChange}/>
                  </div>
                  <div className="md-form pb-3">
                    <label data-error="wrong" data-success="right" htmlFor="Form-username-signup">Fullname</label>
                    <input type="username" value={this.state.fullname} className="form-control validate" name="fullname" onChange={this.handleChange}/>
                  </div>
                  <div>
                    {this.state.errorEmail}
                  </div>
                  <div className="text-center pb-1">
                      {/* Button to make post request */}
                      <button type="button" className="btn blue-gradient btn-block btn-rounded z-depth-1a" onClick={this.emailAndPassAuth}>Register</button>
                  </div>
                  <div>
                    {this.state.dupUser ? 'User already exists' : ''}
                  </div>
                </div>
              </form>
              <div className="modal-header text-center">
                {/* Creates close button for popup */}
                <h4>Or Sign Up With:</h4>
              </div>
               <div className="row my-3 d-flex justify-content-center social">
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
                    {/* Button to Sign up with github*/}
                    <div className="loginOptions">
                      <button type="button" className="btn btn-white btn-rounded z-depth-1a loginButton" onClick={this.authHandler.bind(this, new firebase.auth.GithubAuthProvider())} aria-hidden="true">
                        <i className="fa fa-github"></i>
                      </button>  
                    </div>
                    {/* Button to Sign up with twitter*/}
                    <div className="loginOptions">
                      <button type="button" className="btn btn-white btn-rounded z-depth-1a loginButton" onClick={this.authHandler.bind(this, new firebase.auth.TwitterAuthProvider())} aria-hidden="true">
                        <i className="fa fa-twitter"></i>
                      </button>  
                    </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;