import React, { Component } from "react";
import Auth from "../Auth";
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
        const { location } = this.props;
        this._handleAuthentication({ location });
    }

    _handleAuthentication({ location }) {
        if(this.auth.isAuthenticated()) {
            this.setState({isAuthenticated: this.auth.isAuthenticated()})
        } else {
            this.auth.checkPermission({ location })
                .then(() => this.setState({isAuthenticated: true}))
                .catch(err => alert(err))
        }
    }

    render() {
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            return <Redirect to="/dashboard" />
        } else {
            return <Redirect to="/" />;
        }
    }
}

export default CallbackContainer;
