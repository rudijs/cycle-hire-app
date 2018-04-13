import React, { Component } from "react";
import Auth from "../Auth";
import "./theme/style.css";

class CallbackContainer extends Component {

    auth = new Auth();

    componentDidMount() {
        const { location, history } = this.props;
        this._handleAuthentication({ location, history });
    }

    _handleAuthentication = ({ location, history })=> {
        if(this.auth.isAuthenticated()) {
            history.push('/dashboard')
        } else {
            this.auth.checkPermission({ location })
                .then(() => history.push('/dashboard'))
                .catch(() => history.push('/'))
        }
    };

    render() {
        return <div className="auth-callback-container">Authenticating</div>
    }
}

export default CallbackContainer;
