import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import "./App.css";
// import Header from "./components/Header";
import HomePage from "./components/Home";
import ProfilePage from "./components/Profile";
import SignOutPage from "./components/Signout";

import Auth from "./containers/Auth/Auth";
import history from "./containers/Auth/history";
import Callback from "./containers/Auth/Callback";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import Divider from 'material-ui/Divider';

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
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleDrawerGoTo = (route) => {
    history.replace(route)
    this.setState({open: false})
  }

  render() {
    return (
      <Router history={history}>
        <MuiThemeProvider>
          <div className="App-container">
            <AppBar
              title="Cycle Hire"
              onTitleClick={this.handleToggle}
              onLeftIconButtonClick={this.handleToggle}
            />
            {/* <Header auth={auth} /> */}
            <Drawer 
              open={this.state.open} 
              docked={false}
              onRequestChange={() => this.setState({open: false})}
              auth={auth}>
              <MenuItem onClick={() => this.handleDrawerGoTo('/')}>Home</MenuItem>
              <MenuItem onClick={() => this.handleDrawerGoTo('/profile')}>Profile</MenuItem>
              <MenuItem onClick={() => this.handleDrawerGoTo('/about')}>About Us</MenuItem>
              <Divider />
              {!auth.isAuthenticated() && <MenuItem onClick={auth.login}>Sign In</MenuItem>}
              {auth.isAuthenticated() && <MenuItem onClick={() => this.handleDrawerGoTo('/signout')}>Sign Out</MenuItem>}
            </Drawer>
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
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
