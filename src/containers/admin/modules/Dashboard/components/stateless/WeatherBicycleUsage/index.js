import React, { Component } from "react";
import {
    Area,
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import theme from "./theme";
import "./style.css";
import {CircularProgress, Paper} from "material-ui";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import _ from "lodash";

class WeatherBicycleUsage extends Component {
    render() {
        const { containerStyle, paperStyle, dataSource } = this.props;
        const filtered = dataSource.items.length ? _.head(dataSource.items).usage : null;

        if(!dataSource.items.length) {
            return (
                <div style={{
                    alignSelf: 'center',
                    width: "100%",
                    height: 300,
                    textAlign: 'center',
                    padding: 20
                }}>
                    <CircularProgress /> Loading Graph Usage...
                </div>
            );
        } else {
            return (
                <div className="station-chart-container container clearfix" style={containerStyle}>
                    <Paper zDepth={1} style={Object.assign({}, theme.paper, paperStyle)}>
                        <div className="row">
                            <div className="title col-10">
                                Weather VS Bicycle usage
                            </div>
                        </div>
                        <div className="compose-chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={filtered}>
                                    <XAxis dataKey="commonName" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36}/>
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <Area type="monotone" dataKey="temperature" fill="#ffba00" stroke="#FFC142" />
                                    <Bar dataKey="journeys" barSize={20} fill="#48b5de" />
                                    <Line type="monotone" dataKey="bikes" fill="#fffff" stroke="#283f89" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </Paper>
                </div>
            );
        }
    }
}

WeatherBicycleUsage.propTypes = {
    containerStyle: PropTypes.object,
    paperStyle: PropTypes.object,
};

const mapStateToProps = state => ({
    dataSource: state.reducerMapDatasource
});

export default connect(mapStateToProps)(WeatherBicycleUsage);