import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import HeaderNavigation from "./components/higher-order/HeaderNavigation";
import LoginContainer from "./containers/Login";
import RegistrationContainer from "./containers/Registration";
import CallbackContainer from "./containers/Auth/Callback"
import { connect } from "react-redux";
import muiTheme from "./theme";

class AppRouter extends Component {
    renderContainer = ({url, container}, index) =>
        (
            container ?
                <Route
                    exact={ true }
                    path={ url }
                    key={ index }
                    component={ container }
                />
            : null
        );

  render() {
    const { reducerNav: { items } } = this.props;
    return (
        <MuiThemeProvider muiTheme={ muiTheme }>
            <Router>
                <Switch>
                    <Route exact={ true } path="/" component={ LoginContainer } />
                    <Route exact={ true } path="/registration" component={ RegistrationContainer } />
                    <Route exact={ true } path="/callback" component={ CallbackContainer } />
                    <HeaderNavigation>
                        {items.map(this.renderContainer)}
                    </HeaderNavigation>
                </Switch>
            </Router>
        </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
    reducerNav: state.reducerAdminNavigation
});

export default connect(mapStateToProps)(AppRouter);