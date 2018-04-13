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
      selectedIndex: 2,
      lat: 51.519167,
      lng: -0.147983,
      zoom: 15
    };
    this.infoWindows = [];
  }

  select = index => this.setState({ selectedIndex: index });

  initMap() {
    this.infoWindows = [];

    const { lat, lng, zoom } = this.state;
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: +zoom,
      center: { lat: +lat, lng: +lng }
    });

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    const markers = data.map((location, i) => {
      const marker = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lon },
        // http://kml4earth.appspot.com/icons.html
        // icon: "https://maps.google.com/mapfiles/kml/shapes/cycling.png"
        icon: "/images/markerclusterer/cycling.png"
      });

      const bikes = Math.floor(Math.random() * 8) + 20;
      const spaces = Math.floor(Math.random() * 8) + 10;

      const infoWindowContent = `<p><strong>${location.commonName}</strong></p>
      <p>Plan a Journey (${bikes} bikes) ... (${spaces} spaces)</p>
      <button type="button" onclick='closeInfoWindow(${i});'>Cancel</button>
      <button type="button" onclick='goTo("${
        location.id
      }")'>Select</button>&nbsp;
      `;

      // const infoWindow = new window.google.maps.InfoWindow({
      const infoWindow = new window.google.maps.InfoWindow({
        content: infoWindowContent
      });
      this.infoWindows.push(infoWindow);
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
    // bind a global function to react for google maps popup infowindow to trigger react route change
    window.goTo = id => {
      this.loadPlace(id);
    };

    window.closeInfoWindow = id => {
      this.infoWindows[id].close();
    };

    const coords = this.getCoords(this.props);

    if (!coords.valid) {
      return this.initMap();
    }

    this.setState({ lat: coords.lat, lng: coords.lng, zoom: coords.zoom }, () =>
      this.initMap()
    );
  }
  componentWillMount() {
    // cleanup infoWindow binding helper
    window.goTo = undefined;
  }

  loadPlace(id) {
    // history.push(`/planner/${id}`);
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
              // onClick={() => history.push('/profile')}
            />
            <BottomNavigationItem
              label="Favorites"
              icon={favoritesIcon}
              // onClick={() => history.push('/profile')}
            />
            <BottomNavigationItem
              label="Nearby"
              icon={nearbyIcon}
              onClick={() => {
                this.select(2);
                // temporary workaround to for the 'Nearby' bottom bar button to already re-render the map
                // slightly randomize the lat/lng coordindates each click
                const randomLat = Math.floor(Math.random() * 8) + 1;
                const randomLng = Math.floor(Math.random() * 8) + 1;
                // history.push(
                //   `/map/51.51916${randomLat}/-0.14798${randomLng}/15`
                // );
              }}
            />
          </BottomNavigation>
        </Paper>
      </React.Fragment>
    );
  }
}

export default MapPage;
