import React from "react";

const homePage = props => {
  const { isAuthenticated } = props.auth;

  return (
    <div>
      {isAuthenticated() && <a onClick={props.auth.logout}>Log OUT</a>}
      {!isAuthenticated() && <a onClick={props.auth.login}>Log IN</a>}
    </div>
  );
};

export default homePage;
