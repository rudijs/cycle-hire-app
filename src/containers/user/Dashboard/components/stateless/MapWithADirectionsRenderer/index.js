import React from "react";
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyC_dQy3W2xCy-VYl6HYqap6m3nBV2KL1L0&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new window.google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: new window.google.maps.LatLng(this.props.beginningStation.lat, this.props.beginningStation.lon),
          destination: new window.google.maps.LatLng(this.props.dockingStation.lat, this.props.dockingStation.lon),
          travelMode: window.google.maps.TravelMode.BICYCLING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  })
)(props => {
  return (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={new window.google.maps.LatLng(51.5074, 0.1278)}
    >
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  );
});

export default MapWithADirectionsRenderer;
