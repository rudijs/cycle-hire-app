import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { indigo900, blue500, white } from "material-ui/styles/colors";
import theme from './theme';
import './style.css';
import {Link, Redirect} from "react-router-dom";

class RegistrationContainer extends Component {

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
                            onChange={( nameField ) => this.setState({ nameField })}
                        />
                        <TextField
                            style={theme.form.fields}
                            hintStyle={theme.form.hintStyle}
                            inputStyle={{color: white}}
                            hintText="Surname"
                            fullWidth={true}
                            onChange={( surNameField ) => this.setState({ surNameField })}
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
                            onChange={(phoneNumberField) => this.setState({ phoneNumberField })}
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