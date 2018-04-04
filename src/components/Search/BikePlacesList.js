import React, { Component } from "react";
import TextField from "material-ui/TextField";
import { List, ListItem } from "material-ui/List";
// import Divider from 'material-ui/Divider';
import Subheader from "material-ui/Subheader";

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

  clickHandler = e => {
    this.setState({ filter: new RegExp(e.target.value, 'i') });
  };

  render() {
    return (
      <React.Fragment>
        <TextField
          hintText="Filter Bike locations..."
          onChange={this.clickHandler}
        />
        <List>
          <Subheader>Bike Locations</Subheader>
          {this.filterBikePlaces().map(item => {
            return <ListItem key={item.id} primaryText={item.commonName} />;
          })}
        </List>
      </React.Fragment>
    );
  }
}

export default BikePlacesList;
