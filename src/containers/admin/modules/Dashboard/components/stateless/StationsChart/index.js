import React, { Component } from "react";
import {Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import theme from "./theme";
import "./style.css";
import {CircularProgress, Paper, RaisedButton} from "material-ui";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {actionMapFilterBySize} from "../../../../../../../actions/action-map";
import StationsIconMenu from "./components/StationsIconMenu";


class StationChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: 5,
            stations: [],
            initializedFilter: false
        }
    }

    componentWillReceiveProps() {
        if(this.props.dataSource.items.length !== 0 && !this.state.initializedFilter) {
            this.setState({ initializedFilter: true });
            this.props.actionMapFilterBySize(this.state.size);
        }
    }

    _handleTopChartChange = (size) => {
        this.setState({ size: size });
        if(this.props.onSizeChange) this.props.onSizeChange(size);
        this.props.actionMapFilterBySize(size)
    };

    render() {
        const { dataSource: { isFetching, items, filteredStations } } = this.props;
        if(isFetching && !items.length && !filteredStations.length ) {
            return (
                <div style={{
                    alignSelf: 'center',
                    width: "100%",
                    height: 300,
                    textAlign: 'center',
                    padding: 20,
                }}>
                    <div style={{ marginTop: 40 }}>
                        <CircularProgress /> Loading Stations...
                    </div>
                </div>
            )
        } else {
            const containerStyle = {height: filteredStations.length * ( filteredStations.length > 5 ? 80 : 90)};
            return (
                <div className="station-chart-container container clearfix" style={containerStyle}>
                    <Paper zDepth={1} style={Object.assign({}, theme.paper, containerStyle)}>
                        <div className="row">
                            <div className="title col-10">
                                Most used stations
                            </div>
                            <div className="col-2">
                                <StationsIconMenu onValueChange={this._handleTopChartChange.bind(this)}/>
                            </div>
                            <div className="col-2">
                                <div className="bar-chart-container">
                                    <ResponsiveContainer width={window.innerWidth / 2} height={filteredStations.length * 70}>
                                        <BarChart
                                            data={filteredStations}
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
                                            <Bar dataKey="totalJourney" fill="#48b5de">
                                                <LabelList
                                                    dataKey="totalJourney"
                                                    style={{ fontSize: 12 }}
                                                />
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
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
    onSizeChange: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    actionMapFilterBySize: size => dispatch(actionMapFilterBySize(size))
});

const mapStateToProps = state => ({
    dataSource: state.reducerMapDatasource
});

export default connect(mapStateToProps, mapDispatchToProps)(StationChart);
