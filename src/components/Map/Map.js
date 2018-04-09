import React, { Component } from "react";

import classes from "./Map.css";

import {
  BottomNavigation,
  BottomNavigationItem
} from "material-ui/BottomNavigation";
import Paper from "material-ui/Paper";

import FontIcon from "material-ui/FontIcon";
import IconLocationOn from "material-ui/svg-icons/communication/location-on";
const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

const data = require("../../tmp/bike_point.json");

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      lat: 51.519167,
      lng: -0.147983,
      zoom: 15
    };
  }

  select = index => this.setState({ selectedIndex: index });

  initMap() {
    const { lat, lng, zoom } = this.state;
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: +zoom,
      center: { lat: +lat, lng: +lng }
    });

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    const markers = data.map(function(location, i) {
      const marker = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lon },
        // http://kml4earth.appspot.com/icons.html
        // icon: "https://maps.google.com/mapfiles/kml/shapes/cycling.png"
        icon: "/images/markerclusterer/cycling.png"
      });
      const infoWindow = new window.google.maps.InfoWindow({
        content: location.commonName
      });
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
      return marker;
    });

    // Add a marker clusterer to manage the markers.
    return new window.MarkerClusterer(map, markers, {
      imagePath:
        // "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
        "/images/markerclusterer/m"
    });
  }

  componentDidMount() {
    const coords = this.getCoords(this.props);

    if (!coords.valid) {
      return this.initMap();
    }

    this.setState({ lat: coords.lat, lng: coords.lng, zoom: coords.zoom }, () =>
      this.initMap()
    );
  }

  getCoords(props) {
    const coords = {
      lat: null,
      lng: null,
      zoom: null,
      valid: false
    };

    let lat, lng, zoom;

    try {
      lat = +props.match.params.lat;
      lng = +props.match.params.lng;
      zoom = +props.match.params.zoom;
    } catch (e) {}

    // check lat and lng exist and are valid numbers
    if (lat && lng && zoom && !isNaN(lat) && !isNaN(lng) && !isNaN(zoom)) {
      coords.lat = lat;
      coords.lng = lng;
      coords.zoom = zoom;
      coords.valid = true;
    }

    return coords;
  }

  componentWillReceiveProps(props) {
    const coords = this.getCoords(props);

    if (
      coords.valid &&
      (coords.lat !== this.state.lat ||
        coords.lng !== this.state.lng ||
        coords.zoom !== this.state.zoom)
    ) {
      this.setState(
        { lat: coords.lat, lng: coords.lng, zoom: coords.zoom },
        () => {
          this.initMap();
        }
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="map" className={classes.map} />
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Recents"
              icon={recentsIcon}
              onClick={() => this.select(0)}
            />
            <BottomNavigationItem
              label="Favorites"
              icon={favoritesIcon}
              onClick={() => this.select(1)}
            />
            <BottomNavigationItem
              label="Nearby"
              icon={nearbyIcon}
              onClick={() => {
                this.select(2);
              }}
            />
          </BottomNavigation>
        </Paper>
      </React.Fragment>
    );
  }
}

export default MapPage;
