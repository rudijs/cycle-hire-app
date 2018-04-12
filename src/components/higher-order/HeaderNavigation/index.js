import React, { Component, Children } from 'react';
import { AppBar } from "material-ui";
import HeaderDrawer from "./component/HeaderDrawer";
import {connect} from "react-redux";

class HeaderNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        };
    }

    _drawerToggleHandler = (isOpen) => this.setState({ isOpen });

    render() {
        const { children, nav } = this.props;
        const { isOpen } = this.state;

        return (
            <div className="container-fluid" style={{ padding:0 }}>
                <AppBar
                    title={nav.selected.name}
                    onLeftIconButtonClick={this._drawerToggleHandler.bind(this, !isOpen)}
                    style={{ backgroundColor: "rgb(40, 63, 137)" }}
                />
                <HeaderDrawer
                    isOpen={!isOpen}
                    toggleDrawer={this._drawerToggleHandler.bind(this, !isOpen)}
                />
                <div className="app-container">
                    { Children.map(children, (child, index) => child ) }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    nav: state.reducerAdminNavigation
});

export default connect(mapStateToProps)(HeaderNavigation);