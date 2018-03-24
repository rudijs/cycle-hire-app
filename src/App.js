import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/Home";
import ProfilePage from "./components/Profile";
import SignOutPage from "./components/Signout";

import Auth from "./containers/Auth/Auth";
import history from "./containers/Auth/history";
import Callback from "./containers/Auth/Callback";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const NoMatch = ({ location }) => (
  <div>
    <br />
    <p>
      404 Page Not Found: <code>{location.pathname}</code>
    </p>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App-container">
          <Header auth={auth} />
          <Switch>
            <Route
              path="/"
              exact
              render={props => <HomePage auth={auth} {...props} />}
            />
            <Route
              path="/profile"
              render={props => {
                if (!auth.isAuthenticated()) {
                  return <h3>Please Sign In</h3>;
                }
                return <ProfilePage auth={auth} {...props} />;
              }}
            />
            <Route
              path="/signout"
              render={props => <SignOutPage auth={auth} {...props} />}
            />
            <Route
              path="/callback"
              render={props => {
                handleAuthentication(props);
                return <Callback {...props} />;
              }}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
