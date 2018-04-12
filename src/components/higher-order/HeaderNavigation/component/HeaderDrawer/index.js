import React, { Component } from "react";
import { Drawer, MenuItem } from "material-ui";
import PropTypes from "prop-types";
import theme from "./theme/index";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import actionsNavigator from "../../../../../actions";

class HeaderDrawer extends Component {
    render() {

        const { isOpen, toggleDrawer, navReducers } = this.props;

        return (
            <Drawer
                open={isOpen}
                docked={false}
                onRequestChange={() => toggleDrawer(isOpen)}
            >
                <MenuItem
                    onClick={() => toggleDrawer(isOpen)}
                    style={theme.menuItem}
                >
                    Close Menu
                </MenuItem>
                {
                    navReducers.items.map((r, index) => (
                        <Link
                            key={index}
                            to={r.url}
                        >
                            <MenuItem
                                onClick={this.props._navigationSelectedHandler.bind(this, r.url)}
                            >
                                {r.name}
                            </MenuItem>
                        </Link>
                    ))
                }
            </Drawer>
        )
    }
}

HeaderDrawer.defaultProps = {
    isOpen: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    navReducers: state.reducerAdminNavigation
});

const mapDispatchTopProps = dispatch => ({
   _navigationSelectedHandler: (url) => dispatch(actionsNavigator(url))
});

export default connect(mapStateToProps, mapDispatchTopProps)(HeaderDrawer)