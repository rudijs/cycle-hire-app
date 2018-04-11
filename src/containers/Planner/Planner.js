import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";

import classes from "../../assets/css/skeleton.css";
import data from "../../tmp/bike_point.json";
import getNearByBikePoints from "./nearByBikePoints";

// const nearByBikeStations = require("../../assets/images/tmp-near-by-locations.png");

class Planner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fromData: [],
      fromText: "",
      nearByBikePoints: []
    };
  }

  componentDidMount() {
    let fromLocation;

    if (this.props.match.params.location) {
      fromLocation = data.filter(item => {
        return item.id === this.props.match.params.location;
      });
    }

    if (!fromLocation.length) {
      return;
    }

    this.setState({
      loading: true,
      fromData: fromLocation,
      fromText: fromLocation[0].commonName
    });

    getNearByBikePoints(fromLocation[0])
      .then(res => {
        this.setState({
          nearByBikePoints: res
        });
      })
      .catch(err => {
        console.log("err", err);
      })
      .then(() => {
        this.setState({ loading: false })
        this.props.closeDrawer()
      });
  }

  render() {
    const nearByBikePoints = this.state.nearByBikePoints.map(item => {
      return <ListItem key={item.id} primaryText={item.commonName} secondaryText={<p>Bikes ({item.nbBikes}) Spaces ({item.nbEmptyDocks})</p>} />;
    });

    return (
      <div>
        <h3>Plan a Journey</h3>
        <p>Specify a start and end location for your journey.</p>
        <label htmlFor="from">From Bicycle Docking Station</label>
        <input
          className={classes["u-full-width"]}
          type="text"
          placeholder="From..."
          id="from"
          value={this.state.fromText}
          readOnly
        />
        <label htmlFor="to">To Bicycle Docking Station</label>
        <input
          className={classes["u-full-width"]}
          type="text"
          placeholder="Tap to specify the end..."
          id="to"
        />
        <br />
        <button type="button" className={classes["button-primary"]}>
          Plan my journey
        </button>

        {this.state.loading === true ? <p><strong>Loading near by bike points</strong></p> : ""}

        <List>
          <Subheader>Where shall we dock?</Subheader>
          {nearByBikePoints}
        </List>
      </div>
    );
  }
}

export default Planner;
