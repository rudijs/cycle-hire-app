import React, { Component } from "react";
import history from "../containers/Auth/history";

class SignOut extends Component {
  componentDidMount() {
    setTimeout(() => {
      history.replace("/");
      this.props.closeDrawer();
    }, 1500);
  }
  render() {
    this.props.auth.logout();
    return (
      <div>
        <h3>Signing out...</h3>
        <p>One moment please...</p>
      </div>
    );
  }
}

export default SignOut;
