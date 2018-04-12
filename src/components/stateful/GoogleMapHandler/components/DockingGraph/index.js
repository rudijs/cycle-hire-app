import React, { Component } from 'react';
import {Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {Paper} from "material-ui";
import PropTypes from 'prop-types';
import theme from "./theme";
import './theme/style.css';

const data = [
    {name: 'Craven', uv: 3011, pv: 1398, amt: 2210},
    {name: 'William IV', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Northumberland Avenue', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Union Street', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Lorem', uv: 1890, pv: 4800, amt: 2181}
];

class DockingGraph extends Component {
    render() {

        const { containerStyle, paperStyle} = this.props;

        return (
            <div className="station-chart-container container clearfix" style={containerStyle}>
                <Paper zDepth={1} style={Object.assign({}, theme.paper, paperStyle)}>
                    <div className="compose-chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={data}>
                                <XAxis hide={true} />
                                <YAxis hide={true} />
                                <Legend verticalAlign="top" height={36}/>
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area type="monotone" dataKey="amt" fill="#ffba00" stroke="#FFC142" />
                                <Bar dataKey="uv" barSize={20} fill="#48b5de" />
                                <Line type="monotone" dataKey="pv" fill="#fffff" stroke="#283f89" />
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