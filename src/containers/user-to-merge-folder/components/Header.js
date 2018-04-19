import React from "react";
import { Link } from "react-router-dom";

// import logo from "../assets/images/bicycle-icon.svg";

const header = props => {
  const { isAuthenticated } = props.auth;
  return (
    <React.Fragment>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Cycle Hire</h1>
      </header> */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            {isAuthenticated() && <Link to="/signout">Sign Out</Link>}
            {!isAuthenticated() && <a onClick={props.auth.login}>Sign In</a>}
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default header;
