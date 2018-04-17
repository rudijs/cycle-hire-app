import React, { Component } from 'react';
import {Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {Paper} from "material-ui";
import PropTypes from 'prop-types';
import theme from "./theme";
import './theme/style.css';
import graphData from "../../../../../containers/admin/modules/Dashboard/dataSource.json";

class DockingGraph extends Component {
    render() {

        const { containerStyle, paperStyle} = this.props;

        return (
            <div className="station-chart-container container clearfix" style={containerStyle}>
                <Paper zDepth={1} style={Object.assign({}, theme.paper, paperStyle)}>
                    <div className="compose-chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={graphData}>
                                <XAxis hide={true} />
                                <YAxis hide={true} />
                                <Legend verticalAlign="top" height={36}/>
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area type="monotone" dataKey="bike_usage" fill="#ffba00" stroke="#FFC142" />
                                <Bar dataKey="temperature" barSize={20} fill="#48b5de" />
                                <Line type="monotone" dataKey="rainfall" fill="#fffff" stroke="#283f89" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </Paper>
            </div>
        )
    }
}

DockingGraph.propTypes = {
    containerStyle: PropTypes.object,
    paperStyle: PropTypes.object
};

export default DockingGraph;