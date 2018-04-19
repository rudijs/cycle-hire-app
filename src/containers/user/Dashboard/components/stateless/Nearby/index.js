import React, { Component } from 'react';
import {white} from "material-ui/styles/colors";
import {CircularProgress, RaisedButton} from "material-ui";
import PropTypes from "prop-types";
import './style.css';

class NearbyComponent extends Component {
    render() {

        const { dataSource, onClick } = this.props;

        const nbDocks = dataSource.additionalProperties.filter(item => {
            return item.key === "NbDocks"
        })[0].value

        const nbBikes = dataSource.additionalProperties.filter(item => {
            return item.key === "NbBikes"
        })[0].value

        const nbEmptyDocks = dataSource.additionalProperties.filter(item => {
            return item.key === "NbEmptyDocks"
        })[0].value

        const percentageAvailableBikes = Math.round((nbBikes / nbDocks) * 100);

        return (
            <div className="nearby-component-container container clearfix">
                <div className="row">
                    <CircularProgress
                        mode="determinate"
                        value={percentageAvailableBikes}
                        size={35}
                        thickness={5}
                        style={{ marginRight: 10 }}
                    />
                    <div className="nearby-content col-10">
                        <div className="row">
                            <div className="col-8">
                                <h4 style={{ fontSize: 16, color: "#000", margin: 0 }}>
                                    { dataSource.commonName }
                                </h4>
                                <h6 style={{ fontSize: 14, color: "rgb(72, 181, 222)" }}>
                                    {nbBikes} bikes * {nbEmptyDocks} spaces
                                </h6>
                            </div>
                            <div className="col-4" style={{ padding: 0, textAlign: 'right' }}>
                                <RaisedButton
                                    label="Here"
                                    labelColor={white}
                                    buttonStyle={{ backgroundColor: "#13378f"}}
                                    onClick={() => onClick(dataSource)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

NearbyComponent.propoTypes = {
    dataSource: PropTypes.shape({
        id: PropTypes.string.isRequired,
        commonName: PropTypes.string.isRequired,
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
        placeType: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }),
    onClick: PropTypes.func
};

export default NearbyComponent;