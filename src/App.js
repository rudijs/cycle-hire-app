import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/Home";
import ProfilePage from "./containers/Profile";

import Callback from "./containers/Callback";
import Auth from "./containers/Auth";
import history from "./containers/history";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App-container">
          <Header />
          {/* <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/profile" component={ProfilePage} />
            <Route component={NoMatch} />
          </Switch> */}
          <Route path="/" render={(props) => <HomePage auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </div>
      </Router>
    );
  }
}

export default App;
