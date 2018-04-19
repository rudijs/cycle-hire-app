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
            zoom: 15
        }
    }


    _handleEventClick = (fn, event) => fn ? fn(event) : null;
    render() {
        const {
            onMarkerClusterClick, onMarkerClick, showBicyclelayer,
            dataSource: { items, isFetching },
            countryCoordinates: { selected: { lat, lon } }
        } = this.props;

        return (
            <div>
                <Snackbar
                    open={isFetching !== null ? isFetching : false }
                    message={"Fetching bikepoint information."}
                    onRequestClose={() => false}
                    bodyStyle={{ backgroundColor: "#48b5de" }}
                />
                <GoogleMap
                    defaultZoom={this.state.zoom}
                    center={{ lat, lng: lon }}
                >
                    {
                        items && items.length ?
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
                            : null
                    }
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
    showBicyclelayer: PropTypes.bool
};

const mapStateToProps = state => ({
    dataSource: state.reducerMapDatasource,
    countryCoordinates: state.reducerCountryCoordinates
});

export default connect(mapStateToProps)(withScriptjs(withGoogleMap(MapLayout)));