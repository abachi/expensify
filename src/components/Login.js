import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";
import { googleAuthProvider, githubAuthProvider } from "../firebase/firebase";

export class Login extends React.Component {
  startLoginWithGoogle = () => {
    this.props.startLogin(googleAuthProvider);
  };
  startLoginWithGithub = () => {
    this.props.startLogin(githubAuthProvider);
  };

  render() {
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h1 className="box-layout__title">Expensify</h1>
          <p>It's time to get your expenses under control</p>
          <button
            name="google-login"
            onClick={this.startLoginWithGoogle}
            className="button button--login"
          >
            Login With Google
          </button>
          <button
            name="github-login"
            onClick={this.startLoginWithGithub}
            className="button button--login"
          >
            Login With Github
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: (provider) => dispatch(startLogin(provider)),
});

export default connect(undefined, mapDispatchToProps)(Login);
