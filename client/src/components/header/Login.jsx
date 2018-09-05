import React from 'react';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      // button for Login and Register
      <div className="wrapper">
        {/* Creates button for Login */}
        <div className="container">
          <a className="btn btn-outline-success mb-4" data-toggle="modal" data-target="#elegantModalForm" >Log in</a>
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
                <div className="md-form mb-5">
                  <input type="email" id="Form-email-login-1" className="form-control validate"/>
                  <label data-error="wrong" data-success="right" htmlFor="Form-email-login-1">Your email</label>
                </div>
    
                <div className="md-form pb-3">
                    <input type="text" id="Form-pass-login-1" className="form-control validate"/>
                    <label data-error="wrong" data-success="right" htmlFor="Form-pass-login-1">Your password</label>
                </div>
    
                <div className="text-center mb-3">
                    {/* Button to make post request */}
                    <button type="button" className="btn blue-gradient btn-block btn-rounded z-depth-1a">Sign in</button>
                </div>
                <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign in with:</p>
    
                <div className="row my-3 d-flex justify-content-center">
                    {/* Button to Login with  */}
                    <button type="button" className="btn btn-white btn-rounded z-depth-1a"><i className="fa fa-google-plus"></i></button>
                </div>
              </div>

              <div className="modal-footer mx-5 pt-3 mb-1">
                <p className="font-small grey-text d-flex justify-content-end">Not a member? <a href="#" className="blue-text ml-1"> Sign Up</a></p>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
