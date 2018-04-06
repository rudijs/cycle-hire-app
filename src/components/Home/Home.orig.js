import React, { Component } from "react";
// import { Card, CardTitle, CardText } from "material-ui/Card";
import classes from "./Home.css";

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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      lat: 51.5073509,
      lng: -0.127758,
      zoom: 12
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
    const qsParams = new URLSearchParams(this.props.location.search);

    const lat = qsParams.get("lat");
    const lng = qsParams.get("lng");
    const zoom = qsParams.get("zoom");

    // check lat and lng exist and are valid numbers
    if ( (!lat || !lng || !zoom) || (isNaN(lat) || isNaN(lng) || isNaN(zoom) )) {
      // not valid so return
      return this.initMap();
    }

    this.setState({ lat, lng, zoom }, () => this.initMap());
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
              onClick={() => this.select(2)}
            />
          </BottomNavigation>
        </Paper>
      </React.Fragment>
      // <React.Fragment>
      //   <Card style={style}>
      //     <CardTitle title="Card title One" subtitle="Card One subtitle" />
      //     <CardText>
      //       Lorem ipsum dolor sit amet alejo, consectetur adipiscing elit. Donec
      //       mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec
      //       vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
      //       pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque
      //       lobortis odio.
      //     </CardText>
      //   </Card>
      //   <Card style={style}>
      //     <CardTitle title="Card title Two" subtitle="Card Two subtitle" />
      //     <CardText>
      //       Lorem ipsum two dolor sit amet developer, consectetur adipiscing elit.
      //       Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      //       Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
      //       pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque
      //       lobortis odio.
      //     </CardText>
      //   </Card>
      //   <Card style={style}>
      //     <CardTitle title="Card title Three" subtitle="Card Three subtitle" />
      //     <CardText>
      //       Lorem ipsum three dolor sit amet, consectetur adipiscing elit. Donec
      //       mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec
      //       vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
      //       pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque
      //       lobortis odio.
      //     </CardText>
      //   </Card>
      // </React.Fragment>
    );
  }
}

export default HomePage;
