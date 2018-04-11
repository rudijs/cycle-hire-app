import React from "react";
import history from "../containers/Auth/history";

// class SignOut extends Component {
const SignOut = props => {
  props.auth.logout();

  setTimeout(() => {
    history.replace("/");
    props.closeDrawer();
  }, 1500);

  return (
    <div>
      <h3>Signing out...</h3>
      <p>One moment please...</p>
    </div>
  );
};

export default SignOut;
