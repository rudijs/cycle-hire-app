import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import classes from "./App.css";
// import Header from "./components/Header";
import HomePage from "./components/Home/Home";
import MapPage from "./containers/Map/Map";
import ProfilePage from "./components/Profile";
import SignOutPage from "./components/Signout";
import FilterPage from "./containers/Filter/Filter";
import PlannerPage from "./containers/Planner/Planner";

import Auth from "./containers/Auth/Auth";
import history from "./containers/Auth/history";
import Callback from "./containers/Auth/Callback";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import getMuiTheme from "material-ui/styles/getMuiTheme";
// import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
// import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";

import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";

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
  // TODO:rudijs Once the app loads fetch the latest bike station info from the backend.
  // currently the bike station info is compiled at build time, this helps the map load as fast as possible.
  // so the bike station data follows a pattern of first using the static bike list,
  // then reaching out and updating to the real time on load.

  handleToggle = () => this.setState({ open: !this.state.open });

  closeDrawer = () => this.setState({ open: false });

  handleDrawerGoTo = route => {
    history.push(route);
    this.setState({ open: false });
  };

  render() {
    const iconStyle = {
      display: "inline-flex",
      verticalAlign: "middle"
    };

    return (
      <Router history={history}>
        <MuiThemeProvider>
          {/* <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}> */}
          {/* <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}> */}
          {/* add height 100% for container if route is / for google map */}
          <div
            className={classes.container}
            style={
              // history.location.pathname.match(/\/map/) ? { height: "100%" } : {}
              history.location.pathname.match(/(^\/map|\/$)/)
                ? { height: "100%" }
                : {}
            }
          >
            <AppBar
              title="Cycle Hire"
              onTitleClick={this.handleToggle}
              onLeftIconButtonClick={this.handleToggle}
              // style={{ position: "fixed", top: 0, marginBottom: 100}}
              iconElementRight={
                <FlatButton
                  onClick={() => this.handleDrawerGoTo("/filter")}
                  label="Bicycles"
                />
              }
            />
            {/* <Header auth={auth} /> */}
            <Drawer
              open={this.state.open}
              docked={false}
              onRequestChange={() => this.setState({ open: false })}
              auth={auth}
            >
              <MenuItem onClick={() => this.handleDrawerGoTo("/")}>
                <i className="material-icons md-18" style={iconStyle}>
                  home
                </i>&nbsp;Home
              </MenuItem>

              {/* <MenuItem
                onClick={() =>
                  this.handleDrawerGoTo("/map/51.519167/-0.147983/15")
                }
              >
                <i className="material-icons md-18" style={iconStyle}>
                  map
                </i>&nbsp;London Map
              </MenuItem> */}

              <MenuItem onClick={() => this.handleDrawerGoTo("/filter")}>
                <i className="material-icons md-18" style={iconStyle}>
                  find_in_page
                </i>&nbsp;Bike Docking Stations
              </MenuItem>
              <MenuItem onClick={() => this.handleDrawerGoTo("/profile")}>
                <i className="material-icons md-18" style={iconStyle}>
                  account_circle
                </i>&nbsp;My Profile
              </MenuItem>
              {/* <MenuItem onClick={() => this.handleDrawerGoTo("/about")}>
                <i className="material-icons md-18" style={iconStyle}>
                  contact_phone
                </i>&nbsp;About Us
              </MenuItem> */}
              <Divider />
              {!auth.isAuthenticated() && (
                <MenuItem onClick={auth.login}>
                  <i className="material-icons md-18" style={iconStyle}>
                    arrow_forward
                  </i>&nbsp;Sign In
                </MenuItem>
              )}
              {auth.isAuthenticated() && (
                <MenuItem onClick={() => this.handleDrawerGoTo("/signout")}>
                  <i className="material-icons md-18" style={iconStyle}>
                    arrow_back
                  </i>&nbsp;Sign Out
                </MenuItem>
              )}
            </Drawer>
            <Switch>
              <Route
                path="/"
                exact
                render={props => <HomePage auth={auth} {...props} />}
              />
              {/* http://localhost:3000/map/51.5073509/0.127758/12 */}
              <Route
                path="/map"
                exact
                render={props => <MapPage auth={auth} {...props} />}
              />
              <Route
                path="/map/:lat/:lng/:zoom"
                render={props => <MapPage auth={auth} {...props} />}
              />
              <Route
                path="/filter"
                render={props => (
                  <FilterPage {...props} closeDrawer={this.closeDrawer} />
                )}
              />
              <Route
                path="/profile"
                render={props => {
                  if (!auth.isAuthenticated()) {
                    return (
                      <div id="container">
                        <h3>Please Sign In</h3>
                        <button type="button" onClick={auth.login}>
                          Sign In
                        </button>
                      </div>
                    );
                  }
                  return <ProfilePage auth={auth} {...props} />;
                }}
              />
              <Route
                path="/planner/:location"
                render={props => <PlannerPage auth={auth} {...props} closeDrawer={this.closeDrawer} />}
              />
              <Route
                path="/signout"
                render={props => (
                  <SignOutPage
                    auth={auth}
                    {...props}
                    closeDrawer={this.closeDrawer}
                  />
                )}
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
