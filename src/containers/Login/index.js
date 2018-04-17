import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { indigo900, blue500, white, grey600 } from "material-ui/styles/colors";
import Ionicon from 'react-ionicons';
import theme from './theme';
import './style.css';
import {Link, Redirect} from "react-router-dom";
import Auth from "../../containers/Auth";

class LoginContainer extends Component {

    auth = new Auth();

    constructor() {
        super();
        this.state = {
            emailField: "clp-admin@viseo.com",
            passwordField: "clpADMIN123",
            isAuthenticated: null
        }
    }

    componentDidMount() {
        this._isAuthenticatedHandler();
    }

    login = () => this.auth.login();

    _customSigninHandler = event => {
        console.log(event);
        const { emailField, passwordField } = this.state;
        this.auth.loginWithCredentials({ username: emailField, password: passwordField });
    };

    _isAuthenticatedHandler = () => this.setState({ isAuthenticated: this.auth.isAuthenticated() });

    render() {
        if(this.state.isAuthenticated === true) return <Redirect to="/dashboard" />;
        return (
            <div className="login-container">
                <div className="form-container">
                    <div>
                        <TextField
                            style={theme.form.fields}
                            hintStyle={theme.form.hintStyle}
                            inputStyle={{color: white}}
                            hintText="Email"
                            fullWidth={true}
                            onChange={( event ) => this.setState({ emailField: event.target.value })}
                        />
                        <TextField
                            style={theme.form.fields}
                            hintStyle={theme.form.hintStyle}
                            inputStyle={{color: white}}
                            hintText="Password"
                            type="password"
                            fullWidth={true}
                            onChange={( event ) => this.setState({ passwordField: event.target.value })}
                        />
                    </div>
                    <div className="forgot-password-container clearfix">
                        <a href="" className="float-right">Can't login?</a>
                    </div>
                    <div className="form-submit-container clearfix">
                        <Link to="/registration">
                            <RaisedButton
                                label="I'm new"
                                labelColor={indigo900}
                                className="form-submit-signup float-left"
                            />
                        </Link>
                        <RaisedButton
                            onClick={this._customSigninHandler.bind(this)}
                            label="sign in"
                            labelColor={white}
                            buttonStyle={{ backgroundColor: blue500 }}
                            className="form-submit-signin float-right"
                        />
                    </div>
                    <div
                        style={{
                            color: white, textAlign: 'center',
                            paddingTop: 50, paddingBottom: 50,
                            fontFamily: 'Roboto-Medium, sans-serif'
                        }}
                    >
                        OR
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <RaisedButton
                            label="Connect with facebook"
                            fullWidth={true}
                            secondary={true}
                            buttonStyle={{ backgroundColor: "rgb(59, 89, 152)" }}
                            onClick={this.login}
                            icon={
                                <Ionicon
                                    icon="logo-facebook"
                                    fontSize="20px"
                                    color="white"
                                />
                            }
                        />

                        <RaisedButton
                            label="Sign in with google"
                            fullWidth={true}
                            secondary={false}
                            labelColor={grey600}
                            buttonStyle={{ backgroundColor: white }}
                            style={{ marginTop: 30 }}
                            onClick={this.login}
                            icon={
                                <Ionicon
                                    icon="logo-googleplus"
                                    fontSize="20px"
                                    color="rgb(255, 61, 0)"
                                />
                            }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginContainer;