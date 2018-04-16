import React, { Component } from 'react'
import { RaisedButton } from "material-ui"
import PropTypes from 'prop-types'
import './style.css'

export default class ConfirmDialog extends Component {
    render() {
        const bikes = Math.floor(Math.random() * 8) + 20;
        const spaces = Math.floor(Math.random() * 8) + 10;
        const parkingStatus = `${bikes} bikes • ${spaces} spaces`
        const isDock = this.props.type == "DOCK"
        
        return (
            <div className="dialog">
                <div className="title">
                    <label
                        className={"dialog-title" + (isDock ? "-dock" : "")}
                        htmlFor="begin">
                        {isDock ? "Dock in this station?" : "Begin form this station?"}
                    </label>
                </div>
                <div className={"content" + (isDock ? "-dock" : "")}>
                    <div className="details">
                        <div className="logo-container">
                            <img
                                className="logo"
                                src=""
                            />
                        </div>
                        <div className="station-details">
                            <label
                                className="station-name"
                                htmlFor="name">
                                {this.props.station.commonName}
                            </label>
                            <label
                                className="station-parking"
                                htmlFor="parking">
                                {parkingStatus}
                            </label>
                        </div>
                    </div>
                    <div className="choices">
                        <RaisedButton
                            className="choice-button"
                            label="Cancel"
                            labelColor={"#13378f"}
                            buttonStyle={{ backgroundColor: "white" }}
                            onClick={this.props.onCancelClick}
                        />
                        <RaisedButton
                            className="choice-button"
                            label="Select"
                            labelColor={"#13378f"}
                            buttonStyle={{ backgroundColor: "white" }}
                            onClick={this.props.onSelectClick}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

ConfirmDialog.propTypes = {
    type: PropTypes.string,
    station: PropTypes.object,
    onCancelClick: PropTypes.func,
    onSelectClick: PropTypes.func
}
