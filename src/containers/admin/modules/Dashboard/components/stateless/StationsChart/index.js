import React, { Component } from "react";
import {Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import theme from "./theme";
import "./style.css";
import {Paper, RaisedButton} from "material-ui";
import StationsIconMenu from "./components/StationsIconMenu";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class StationChart extends Component {

    app_id = "aabecbde2fc66eba7b65d4c434fb5ca8";

    constructor(props) {
        super(props);
        this.state = {
            size: 5
        }
    }

    componentDidMount() {
        const newDataSource = this.props.dataSource.items.map(item => this.getWeatherByLocation({ lat: item.lat, lon: item.lon }));
    }

    getWeatherByLocation = ({ lat, lon }) => {
        console.log(lat, lon)
        fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "appid=" + this.app_id)
            .then(response => response.json())
            .then(responseJson => console.log(responseJson))
    };

    _handleTopChartChange = (value) => {
        this.setState({ size: value });
        this.props.onSizeChange(value);
    };

    render() {
        const { containerStyle, paperStyle, data } = this.props;
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

                    <div className="bar-chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data.slice(0, this.state.size)}
                                layout="vertical"
                                barSize={20}
                                barCategoryGap={5}
                                margin={{ top: 5, right: 5, bottom: 5, left: 90 }}
                            >
                                <XAxis hide={true}/>
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    orientation="left"
                                    allowDataOverflow={true}
                                    allowDuplicatedCategory={true}
                                    axisLine={true}
                                />
                                <Tooltip />
                                <Bar dataKey="rainfall" fill="#48b5de">
                                    <LabelList
                                        dataKey="rainfall"
                                        style={{ fontSize: 12}}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
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

StationChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        rainfall: PropTypes.number.isRequired,
        temperature: PropTypes.number.isRequired
    })),
    onSizeChange: PropTypes.func,
    containerStyle: PropTypes.object,
    paperStyle: PropTypes.object
};

const mapStateToProps = state => ({
   dataSource: state.reducerMapDatasource
});

export default connect(mapStateToProps)(StationChart);