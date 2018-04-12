import React, { Component } from 'react';
import {white} from "material-ui/styles/colors";
import {CircularProgress, RaisedButton} from "material-ui";
import './style.css';

export default class NearbyComponent extends Component {
    render() {
        return (
            <div className="nearby-component-container container clearfix">
                <div className="row">
                    <CircularProgress
                        mode="determinate"
                        value={80}
                        size={35}
                        thickness={5}
                        style={{ marginRight: 10 }}
                    />
                    <div className="nearby-content col-10">
                        <div className="row">
                            <div className="col-8">
                                <h4 style={{ fontSize: 16, color: "#000", margin: 0 }}>
                                    Craven Street, Strand
                                </h4>
                                <h6 style={{ fontSize: 14, color: "rgb(72, 181, 222)" }}>
                                    2 bikes * 24 spaces
                                </h6>
                            </div>
                            <div className="col-4" style={{ padding: 0, textAlign: 'right' }}>
                                <RaisedButton
                                    label="Here"
                                    labelColor={white}
                                    buttonStyle={{ backgroundColor: "#13378f"}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}