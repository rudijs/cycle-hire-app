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

const WeatherBicycleUsage = ({ containerStyle, paperStyle, data }) => (
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
                        data={data}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36}/>
                        <CartesianGrid stroke="#f5f5f5" />
                        <Area type="monotone" dataKey="temperature" fill="#ffba00" stroke="#FFC142" />
                        <Bar dataKey="rainfall" barSize={20} fill="#48b5de" />
                        <Line type="monotone" dataKey="bike_usage" fill="#fffff" stroke="#283f89" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </Paper>
    </div>
);

WeatherBicycleUsage.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        rainfall: PropTypes.number.isRequired,
        temperature: PropTypes.number.isRequired
    })),
    containerStyle: PropTypes.object,
    paperStyle: PropTypes.object,
};

export default WeatherBicycleUsage;