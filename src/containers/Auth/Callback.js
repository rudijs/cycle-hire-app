import React, { Component } from "react";

import Auth from "../Auth";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";

class CallbackContainer extends Component {
    auth = new Auth();

    constructor() {
        super();
        this.state = {
            isAuthenticated: null
        }
    }

    componentWillMount() {
        if(this.auth.isAuthenticated()) {
            this.setState({isAuthenticated: this.auth.isAuthenticated()})
        } else {
            this.auth.checkPermission(this.props);
        }
    }

    render() {
        if (!!this.state.isAuthenticated) {
            return <Redirect to="/dashboard" />
        } else if (!this.state.isAuthenticated) {
            return <Redirect to="/" />;
        } else {
            return (<div>Unexpected error occured.</div>)
        }
    }
}

export default connect()(CallbackContainer);
