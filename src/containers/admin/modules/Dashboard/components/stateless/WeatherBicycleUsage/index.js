import React from "react";
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
import {Paper} from "material-ui";
import PropTypes from "prop-types";

const WeatherBicycleUsage = ({ containerStyle, paperStyle, data }) => {
    const filtered = data.filter(_ => {
        // Time of day 24 hour
        const time = 12;
        // Base temperature for the day
        const tempBase = 10;
        // Fluctuations, multiplied with base temperature, indices correspond to hour of the day
        const fluc = [0, 1, 1, 2, 1, 1, 2.5, 3.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

        // Work out the temperature of the given day for the given hour 24 format
        const temp = tempBase * fluc[time];
        return {
            commonName: _.commonName,
            bikes: _.bikes,
            temperature: temp
        }
    });

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
                        <ComposedChart
                            data={filtered}
                        >
                            <XAxis dataKey="commonName" />
                            <YAxis />
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36}/>
                            <CartesianGrid stroke="#f5f5f5" />
                            <Area type="monotone" dataKey="temperature" fill="#ffba00" stroke="#FFC142" />
                            <Bar dataKey="rainfall" barSize={20} fill="#48b5de" />
                            <Line type="monotone" dataKey="bikes" fill="#fffff" stroke="#283f89" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </Paper>
        </div>
    );
};

WeatherBicycleUsage.propTypes = {
    data: PropTypes.array.isRequired,
    containerStyle: PropTypes.object,
    paperStyle: PropTypes.object,
};

export default WeatherBicycleUsage;