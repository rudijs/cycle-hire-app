import React, { Component } from "react";
import "./theme/style.css";
import FilterForm from "./components/stateless/FilterForm";
import StationChart from "./components/stateless/StationsChart";
import WeatherBicycleUsage from "./components/stateless/WeatherBicycleUsage";
import {FlatButton} from "material-ui";
import GoogleMapHandler from "../../../../components/stateful/GoogleMapHandler";
import PinModal from "../../../../components/stateful/GoogleMapHandler/components/PinModal";
import {actionMapSetSelected, actionSetMapDataSource} from "../../../../actions/action-map";
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
        this.getBikepoints();
    }

    getBikepoints = () => {
        const { dataSource, actionSetMapDataSource } = this.props;
        if(!dataSource.items.length) actionSetMapDataSource();
    };

    _handleAreaChange = (event, index, area) => this.setState({ area });
    _handleStationChange = (event, index, station) => this.setState({ station });
    _openFilterHandler = (openFilter) => this.setState({ openFilter: !openFilter });

    _openPinHandler = ({ marker, ...event }) => {
        this.props.actionMapSetSelected(marker);
        this.setState({ isOpen: !this.state.isOpen, activePinData: marker });
    };

    onMarkerClusterClick = (markerCluster) => markerCluster.getMarkers();

    render() {
        const { area, openFilter, isOpen, activePinData } = this.state;
        const { dataSource } = this.props;

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
                        <StationChart />
                        <WeatherBicycleUsage
                            paperStyle={{ height: ( window.innerHeight / 2 ) + 100 }}
                        />
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 dashboard-map-container">
                        <GoogleMapHandler
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
    actionSetMapDataSource: ()=> actionSetMapDataSource(dispatch),
    actionMapSetSelected: selected=> dispatch(actionMapSetSelected(selected))
});

const mapStateToProps = state => ({
   dataSource: state.reducerMapDatasource
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)