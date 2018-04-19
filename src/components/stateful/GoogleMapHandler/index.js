import React, { Component } from 'react';
import MapLayout from "./MapLayoutComponent";
import PropTypes from 'prop-types';

const mapUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCac4KiePeteNK02OJTgHWGtBEvMAWGL5M&v=3.exp&libraries=geometry,drawing,places"

class GoogleMapHandler extends Component {
    render() {
        const { onMarkerClick, onMarkerClusterClick, showBicyclelayer, dataSource, containerStyle  } = this.props;

        return (
            <MapLayout
                googleMapURL={mapUrl}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={containerStyle} />}
                mapElement={<div style={{ height: `100%` }} />}
                onMarkerClick={onMarkerClick}
                onMarkerClusterClick={onMarkerClusterClick}
                showBicyclelayer={showBicyclelayer}
                dataSource={dataSource}
            />
        )
    }
}

GoogleMapHandler.propTypes = {
    onMarkerClick: PropTypes.func,
    onMarkerClusterClick: PropTypes.func,
    showBicyclelayer: PropTypes.bool,
    containerStyle: PropTypes.object,
    dataSource: PropTypes.shape({
        item: PropTypes.array,
        isFetching: PropTypes.bool
    })
};

GoogleMapHandler.defaultTypes = {
    dataSource: {
        items: [],
        isFetching: null
    }
};

export default GoogleMapHandler;