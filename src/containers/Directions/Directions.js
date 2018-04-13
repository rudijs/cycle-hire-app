import React, { Component } from "react";

import classes from "./Directions.css";

class Directions extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  initMap(coords) {
    var directionsDisplay = new window.google.maps.DirectionsRenderer();
    var directionsService = new window.google.maps.DirectionsService();
    var haight = new window.google.maps.LatLng(37.7699298, -122.4469157);
    var mapOptions = {
      zoom: 14,
      center: haight
    };
    var map = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );
    directionsDisplay.setMap(map);
    this.calcRoute(directionsService, directionsDisplay, coords);
  }

  calcRoute(directionsService, directionsDisplay, coords) {
    var request = {
      origin: new window.google.maps.LatLng(coords.originLat, coords.orignLng),
      destination: new window.google.maps.LatLng(coords.destLat, coords.destLng),
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: window.google.maps.TravelMode["BICYCLING"]
    };
    directionsService.route(request, function(response, status) {
      console.log("todo handle status", status);
      if (status === "OK") {
        directionsDisplay.setDirections(response);
      }
    });
  }

  componentDidMount() {
    const { originLat, orignLng, destLat, destLng } = this.props.match.params;
    this.initMap({ originLat, orignLng, destLat, destLng });
    // weirdness, need to close the material-ui side drawer for the map the render properly
    this.props.closeDrawer();
  }

  render() {
    return <div id="map" className={classes.map} />;
  }
}

export default Directions;
