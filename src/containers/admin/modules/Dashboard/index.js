import React, { Component } from "react";
import "./theme/style.css";
import FilterForm from "./components/stateless/FilterForm";
import StationChart from "./components/stateless/StationsChart";
import WeatherBicycleUsage from "./components/stateless/WeatherBicycleUsage";
import {FlatButton} from "material-ui";
import GoogleMapHandler from "../../../../components/stateful/GoogleMapHandler";
import graphData from "./dataSource.json";
import PinModal from "../../../../components/stateful/GoogleMapHandler/components/PinModal";
import {actionMapDataSource} from "../../../../actions/action-map";
import {connect} from "react-redux";

class DashboardContainer extends Component {
    constructor() {
        super();
        this.state = {
            area: "London",
            openFilter: true,
            isOpen: false,
            activePinData: { commonName: null },
            dataSource: {
                isFetching: true,
                items: [],
            }
        }
    }

    componentWillMount() {
        this.getBikepoints()
    }

    _handleAreaChange = (event, index, area) => this.setState({ area });
    _handleStationChange = (event, index, station) => this.setState({ station });
    _openFilterHandler = (openFilter) => this.setState({ openFilter: !openFilter });
    onDataChangeHandler = (size) => {
        const data = this.state.dataSource.items.slice();
        this.setState({
            dataSource: {
                isFetching: false,
                items: data.slice(0, size)
            }
        })
    };
    _openPinHandler = ({ marker, ...event }) => {
        this.setState({ isOpen: !this.state.isOpen, activePinData: marker })
    };
    onMarkerClusterClick = (markerCluster) => {
        const clickedMarkers = markerCluster.getMarkers();
        console.log(`Current clicked markers length: ${clickedMarkers.length}`);
        console.log(clickedMarkers)
    };

    getBikepoints = () => {
        const { actionMapDataSource } = this.props;
        this.setState({
            dataSource: {
                isFetching: false,
                items: []
            }
        });
        fetch("https://tajz77isu1.execute-api.us-east-1.amazonaws.com/dev/bikepoint")
            .then(response => response.json())
            .then(response => {
                this.setState({
                    dataSource: {
                        isFetching: false,
                        items: response,
                        commonName: null
                    }
                });
                actionMapDataSource(response);
            })
            .catch(error => {
                this.setState({
                    dataSource: {
                        isFetching: false,
                        items: []
                    }
                });
                if(error.message) alert(error.message);
            });
    };

    render() {
        const { area, openFilter, isOpen, activePinData, dataSource } = this.state;

        return (
            <div className="dashboard-container">
                <FlatButton
                    onClick={this._openFilterHandler.bind(this, openFilter)}
                    label="Filters"
                    fullWidth={true}
                    style={{ borderRadius: 0, color: '#ffffff', paddingLeft: 15 }}
                    backgroundColor="#233672"
                    rippleColor="#233672"
                    hoverColor="#233672"
                    className="filter-form-button"
                />
                <div className={ openFilter ? "active-filter" : "inactive-filter"}>
                    {
                        openFilter ?
                            <FilterForm
                                area={{
                                    default: area, item: [],
                                    onChangeHandler: this._handleAreaChange.bind(this)
                                }}
                                onStationChange={this._handleStationChange.bind(this)}
                            />
                            :
                            null
                    }
                </div>
                <div className="row" style={{ margin: 0 }}>
                    <div className="col-sm-12 col-md-12 col-lg-6 chart-container">
                        <StationChart
                            dataSource={dataSource}
                            onSizeChange={this.onDataChangeHandler.bind(this)}
                            paperStyle={{ height: window.innerHeight / 2 }}
                        />
                        <WeatherBicycleUsage
                            data={dataSource.items}
                            paperStyle={{ height: window.innerHeight / 2}}
                        />
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 dashboard-map-container">
                        <GoogleMapHandler
                            containerHeight={window.innerHeight}
                            onMarkerClick={this._openPinHandler.bind(this)}
                            onMarkerClusterClick={this.onMarkerClusterClick.bind(this)}
                            showBicyclelayer={false}
                            dataSource={dataSource}
                        />
                    </div>
                </div>
                <PinModal
                    isOpen={isOpen}
                    toggleHandler={this._openPinHandler}
                    data={activePinData ? activePinData : null}
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actionMapDataSource: (dataSrouce) => dispatch(actionMapDataSource(dataSrouce))
});

const mapStateToProps = state => ({
   dataSource: state.reducerMapDatasource
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)