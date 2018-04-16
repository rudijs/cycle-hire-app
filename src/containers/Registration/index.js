import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { indigo900, blue500, white } from "material-ui/styles/colors";
import theme from './theme';
import './style.css';
import {Link, Redirect} from "react-router-dom";
import Auth from "../../containers/Auth";
import axios from "axios";

class RegistrationContainer extends Component {

    auth = new Auth();
    login = () => this.auth.login();

    constructor() {
        super();
        this.state = {
            emailField: null,
            passwordField: null,
            isAuthenticated: null
        }
    }

    _customLogin = () => {
        const { emailField, passwordField } = this.state;
        // if (!emailField || !passwordField) alert("Please input required fields.");

        const options = { method: 'POST',
            url: 'https://viseo.auth0.com/dbconnections/signup',
            headers: { 'content-type': 'application/json' },
            body:
                { client_id: 'MF1fEMPOT4tYI91r3ZVTb3z6rPTnf0Q4',
                    email: emailField,
                    password: passwordField,
                    user_metadata: { permission: "user" } },
            json: true };

        axios.post(
                options.url,
                {
                    "email": "jeffrey.forones@viseo.com",
                    "password": "password"
                },
                { responseType: 'json' }
            )
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
    };

    componentDidMount() {
        this._isAuthenticatedHandler();
    }

    _isAuthenticatedHandler = () => this.setState({ isAuthenticated: this.auth.isAuthenticated() });

    render() {
        if(this.state.isAuthenticated) return <Redirect to="/dashboard" />;
        return (
            <div className="login-container">
                <div className="form-container">
                    <div>
                        <TextField
                            style={theme.form.fields}
                            hintStyle={theme.form.hintStyle}
                            inputStyle={{color: white}}
                            hintText="Name"
                            fullWidth={true}
                            onChange={(emailField) => this.setState({ emailField })}
                        />
                        <TextField
                            style={theme.form.fields}
                            hintStyle={theme.form.hintStyle}
                            inputStyle={{color: white}}
                            hintText="Surname"
                            fullWidth={true}
                            onChange={(emailField) => this.setState({ emailField })}
                        />
                        <TextField
                            style={theme.form.fields}
                            hintStyle={theme.form.hintStyle}
                            inputStyle={{color: white}}
                            hintText="Email"
                            fullWidth={true}
                            onChange={(emailField) => this.setState({ emailField })}
                        />
                        <TextField
                            style={theme.form.fields}
                            hintStyle={theme.form.hintStyle}
                            inputStyle={{color: white}}
                            hintText="Password"
                            type="password"
                            fullWidth={true}
                            onChange={(passwordField) => this.setState({ passwordField })}
                        />
                        <TextField
                            style={theme.form.fields}
                            hintStyle={theme.form.hintStyle}
                            inputStyle={{color: white}}
                            hintText="Phone Number"
                            fullWidth={true}
                            onChange={(emailField) => this.setState({ emailField })}
                        />
                    </div>
                    <div className="form-submit-container clearfix">
                        <Link to="/">
                            <RaisedButton
                                label="Sign In"
                                labelColor={indigo900}
                                className="form-submit-signup float-left"
                            />
                        </Link>
                        <RaisedButton
                            onClick={this._customLogin.bind(this)}
                            label="Sign Up"
                            labelColor={white}
                            buttonStyle={{ backgroundColor: blue500 }}
                            className="form-submit-signin float-right"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrationContainer;