import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { indigo900, blue500, white, grey600 } from "material-ui/styles/colors";
import Ionicon from 'react-ionicons';
import theme from './theme';
import './style.css';
import { Link } from "react-router-dom";
import Auth0 from "../../../../config"

export default class LoginContainer extends Component {
    login = () => Auth0.authorize();

    render() {
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
                        />
                        <TextField
                            style={theme.form.fields}
                            hintStyle={theme.form.hintStyle}
                            inputStyle={{color: white}}
                            hintText="Password"
                            type="password"
                            fullWidth={true}
                        />
                    </div>
                    <div className="forgot-password-container clearfix">
                        <a href="" className="float-right">Can't login?</a>
                    </div>
                    <div className="form-submit-container clearfix">
                        <Link to="/admin/dashboard">
                            <RaisedButton
                                label="I'm new"
                                labelColor={indigo900}
                                className="form-submit-signup float-left"
                            />
                        </Link>
                        <Link to="/admin/dashboard">
                            <RaisedButton
                                label="sign in"
                                labelColor={white}
                                buttonStyle={{ backgroundColor: blue500 }}
                                className="form-submit-signin float-right"
                            />
                        </Link>
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