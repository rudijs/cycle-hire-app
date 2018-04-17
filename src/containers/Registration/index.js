import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { indigo900, blue500, white } from "material-ui/styles/colors";
import theme from './theme';
import './style.css';
import {Link, Redirect} from "react-router-dom";
import Auth from "../../containers/Auth";

class RegistrationContainer extends Component {
    auth = new Auth();

    constructor() {
        super();
        this.state = {
            nameField: null,
            surNameField: null,
            emailField: null,
            passwordField: null,
            phoneNumberField: null,
            isAuthenticated: null
        }
    }

    _signupHandler = () => {
        const { emailField, passwordField, nameField, surNameField, phoneNumberField } = this.state;
        this.auth.signup({
            name: nameField,
            password: passwordField,
            email: emailField,
            user_metadata: {
                surName: surNameField,
                phoneNumber: phoneNumberField,
                permission: "user"
            }
        })
    };

    _customSignupHandler = event => {
        event.preventDefault();
        const { api_endpoint, authorization, connection: { usernamePasswordAuthentication } } = this.auth;
        const { emailField, passwordField, nameField, surNameField, phoneNumberField } = this.state;

        fetch(api_endpoint + "/users", {
            method: "POST",
            body: JSON.stringify({
                connection: usernamePasswordAuthentication,
                name: nameField,
                nickname: surNameField,
                email: emailField,
                password: passwordField,
                email_verified: true,
                user_metadata: {
                    surName: surNameField,
                    phoneNumber: phoneNumberField,
                    permission: "user"
                }
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": authorization
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.statusCode && jsonResponse.statusCode !== 200) throw jsonResponse;
                this.auth.setCustomSession({ profile: jsonResponse, lock: true })
                    .then(() => this.props.history.push("/dashboard"));
            })
            .catch(error => alert(error.message))
    };

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
                            hintText="Name"
                            fullWidth={true}
                            onChange={( event ) => this.setState({ nameField: event.target.value })}
                        />
                        <TextField
                            style={theme.form.fields}
                            hintStyle={theme.form.hintStyle}
                            inputStyle={{color: white}}
                            hintText="Surname"
                            fullWidth={true}
                            onChange={( event ) => this.setState({ surNameField: event.target.value })}
                        />
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
                        <TextField
                            style={theme.form.fields}
                            hintStyle={theme.form.hintStyle}
                            inputStyle={{color: white}}
                            hintText="Phone Number"
                            fullWidth={true}
                            onChange={( event ) => this.setState({ phoneNumberField: event.target.value })}
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
                            onClick={this._customSignupHandler.bind(this)}
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