import React, { Component } from "react";
import TextField from "material-ui/TextField";
import { List, ListItem } from "material-ui/List";
// import Divider from 'material-ui/Divider';
import Subheader from "material-ui/Subheader";
// import history from '../../containers/Auth/history'

const data = require("../../tmp/bike_point.json");

class BikePlacesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: new RegExp(/.*/)
    };
  }

  filterBikePlaces() {
    return data.filter(item => {
      return this.state.filter.test(item.commonName);
    });
  }

  changeHandler = e => {
    this.setState({ filter: new RegExp(e.target.value, "i") });
  };

  clickHandler = coords => {
    this.props.history.push(`/map/${coords.lat}/${coords.lng}/18`);
    // call closeDrawer on App.js component, to force a render for google maps 100% height (issue/workaround)
    this.props.closeDrawer();
  };

  render() {
    return (
      <React.Fragment>
        <TextField
          hintText="Filter Bike locations..."
          onChange={this.changeHandler}
        />
        <List>
          <Subheader>Bike Locations</Subheader>
          {this.filterBikePlaces().map(item => {
            return (
              <ListItem
                key={item.id}
                primaryText={item.commonName}
                onClick={() =>
                  this.clickHandler({ lat: item.lat, lng: item.lon })
                }
              />
            );
          })}
        </List>
      </React.Fragment>
    );
  }
}

export default BikePlacesList;
