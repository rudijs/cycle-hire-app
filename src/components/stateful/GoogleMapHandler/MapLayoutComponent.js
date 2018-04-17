import React, { Component } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import { BicyclingLayer } from "react-google-maps/lib/components/BicyclingLayer";
import pinImage from "./assets/pinPoint.png";
import PropTypes from "prop-types";
import { Snackbar } from "material-ui";
import {connect} from "react-redux";

class MapLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            dataSource: []
        }
    }

    _handleEventClick = (fn, event) => fn ? fn(event) : null;

    render() {
        const { onMarkerClusterClick, onMarkerClick, showBicyclelayer, dataSource: { items, isFetching }  } = this.props;

        return (
            <div>
                <Snackbar
                    open={isFetching}
                    message="Fetching bikepoint information."
                    onRequestClose={() => false}
                    bodyStyle={{ backgroundColor: "#48b5de" }}
                />
                <GoogleMap
                    defaultZoom={15}
                    defaultCenter={{ lat: 51.529163, lng: -0.10997 }}
                >
                    <MarkerClusterer
                        onClick={(markerClusterEvent) => this._handleEventClick(onMarkerClusterClick, markerClusterEvent)}
                        averageCenter
                        enableRetinaIcons
                        gridSize={100}
                    >
                        {
                            items.map((marker, index) =>
                                <Marker
                                    key={index}
                                    position={{ lat: marker.lat, lng: marker.lon }}
                                    icon={pinImage}
                                    onClick={(markerData) => this._handleEventClick(onMarkerClick, (Object.assign({}, markerData, { marker })))}
                                />
                            )
                        }
                    </MarkerClusterer>
                    {
                        !!showBicyclelayer ?
                            <BicyclingLayer autoUpdate={false} />
                            : null
                    }
                </GoogleMap>
            </div>
        )
    }
}

MapLayout.propTypes = {
    onMarkerClick: PropTypes.func,
    onMarkerClusterClick: PropTypes.func,
    showBicyclelayer: PropTypes.bool,
    dataSource: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.object),
        isFetching: PropTypes.bool
    })
};

const mapStateToProps = state => ({
    dataSource: state.reducerMapDatasource
});

export default connect(mapStateToProps)(withScriptjs(withGoogleMap(MapLayout)));