import React, { Component } from "react";
import {Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import theme from "./theme";
import "./style.css";
import {Paper, RaisedButton} from "material-ui";
import StationsIconMenu from "./components/StationsIconMenu";
import PropTypes from "prop-types";
import _ from "lodash";


class StationChart extends Component {

    app_id = "aabecbde2fc66eba7b65d4c434fb5ca8";

    constructor(props) {
        super(props);
        this.state = {
            size: 5,
            stations: []
        }
    }

    getWeatherByLocation = ({ lat, lon }) => {
        return fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "appid=" + this.app_id)
            .then(response => response.json())
    };

    _handleTopChartChange = (value) => {
        this.setState({ size: value });
        this.props.onSizeChange(value);
    };

    setTopDataSource = (items, size) => {
        if(items.length) {
            return <LoadStations stations={_.orderBy(items, "journeys", ['desc']).slice(0, size)}/>;
        }
    };

    render() {
        const { containerStyle, paperStyle, dataSource: { isFetching, items } } = this.props;

        if(isFetching && !items.length) {
            return (
                <div style={{
                    alignSelf: 'center',
                    width: "100%",
                    height: 50,
                    textAlign: 'center',
                    padding: 20
                }}>
                    Loading Stations...
                </div>
            )
        } else {
            return (
                <div className="station-chart-container container clearfix" style={containerStyle}>
                    <Paper zDepth={1} style={Object.assign({}, theme.paper, paperStyle)}>
                        <div className="row">
                            <div className="title col-10">
                                Most used stations
                            </div>
                            <div className="col-2">
                                <StationsIconMenu onValueChange={this._handleTopChartChange.bind(this)}/>
                            </div>
                        </div>
                        { this.setTopDataSource(items, this.state.size) }
                        <div className="map-button-container clearfix">
                            <RaisedButton
                                label="Map"
                                buttonStyle={theme.raisedButton}
                                labelColor={theme.raisedButton.textColor}
                                className="float-right"
                            />
                        </div>
                    </Paper>
                </div>
            )
        }
    }
}

StationChart.propTypes = {
    onSizeChange: PropTypes.func,
    containerStyle: PropTypes.object,
    paperStyle: PropTypes.object,
    dataSource: PropTypes.shape({
        isFetching: PropTypes.bool.isRequired,
        items: PropTypes.array.isRequired
    })
};

export default StationChart;

const LoadStations = ({ stations }) => {
    return (
        <div className="bar-chart-container">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={stations.length ? stations : []}
                    layout="vertical"
                    barSize={20}
                    barCategoryGap={5}
                    margin={{ top: 5, right: 5, bottom: 5, left: 90 }}
                >
                    <XAxis hide={true}/>
                    <YAxis
                        type="category"
                        dataKey="commonName"
                        orientation="left"
                        allowDataOverflow={true}
                        allowDuplicatedCategory={true}
                        axisLine={true}
                    />
                    <Tooltip />
                    <Bar dataKey="journeys" fill="#48b5de">
                        <LabelList
                            dataKey="journeys"
                            style={{ fontSize: 12 }}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};


LoadStations.propTypes = {
    stations: PropTypes.array.isRequired
};