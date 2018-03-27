import React, { Component } from "react";
// import { Card, CardTitle, CardText } from "material-ui/Card";

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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0 };
  }

  select = index => this.setState({ selectedIndex: index });

  initMap() {
    var uluru = { lat: -25.363, lng: 131.044 };
    var map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru
    });
    var marker = new window.google.maps.Marker({
      position: uluru,
      map: map
    });
  }

  componentDidMount() {
    this.initMap();
  }

  // style = {
  //   maxWidth: 500,
  //   marginTop: "2rem"
  // };

  render() {
    return (
      <React.Fragment>
        <div id="map" />
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
