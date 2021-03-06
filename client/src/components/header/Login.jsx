import React from 'react';
import firebase from 'firebase';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.authHandler = this.authHandler.bind(this);
  }

  authHandler(provider) {
    this.props.oAuthLogin(provider)
  }

  clickHandler(email, password, uid) {
    this.props.onLogin(email, password, uid);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
      [evt.target.password]: evt.target.value
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
        <div className="modal fade" id="elegantModalForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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

                </form>
                <div className="input-group md-form  mb-3">
                <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span><input type="text" id="Form-email-login" className="form-control validate" placeholder="Email address" name="email" onChange={this.handleChange}/>
                  <label data-error="wrong" data-success="right" placeholder="Email address" htmlFor="Form-email-login"></label>
                </div>
    
                <div className="input-group md-form pb-3">
                <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span><input type="password" id="Form-pass-login" className="form-control validate" placeholder="Password" name="password" onChange={this.handleChange}/>
                    <label data-error="wrong" data-success="right" htmlFor="Form-pass-login"></label>
                </div>
    
                <div className="text-center mb-3">
                    {/* Button to make post request */}
                    <button type="button" className="btn blue-gradient btn-block btn-rounded z-depth-1a hoverable" 
                      onClick={this.clickHandler.bind(this, this.state.email, this.state.password)} data-dismiss="modal" aria-hidden="true">Sign in
                    </button>
                </div>

                <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign in with:</p>
    
                <div className="row my-3 d-flex justify-content-center">
                    {/* Button to Login with google*/}
                    <button type="button" className="btn btn-white btn-rounded z-depth-1a" onClick={this.authHandler.bind(this, new firebase.auth.GoogleAuthProvider())} data-dismiss="modal" aria-hidden="true">
                      <i className="fa fa-google-plus"></i>
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

export default Login;


// ya29.GlsQBv5-FNvbldZWomUUcNvem-znOxOSQ4Nls5Y-5bLLuvIs5xq1cgRXxi2M1PIlFc9SFDGGgx29y57qYLC0FXRgwkZsRXPWKRooBKpJFZW2aeuUuVfks8Z1DTy_