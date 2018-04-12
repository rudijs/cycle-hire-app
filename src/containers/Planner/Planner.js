import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import RaisedButton from "material-ui/RaisedButton";

import classes from "../../assets/css/skeleton.css";
import data from "../../tmp/bike_point.json";
import getNearByBikePoints from "./nearByBikePoints";

// const nearByBikeStations = require("../../assets/images/tmp-near-by-locations.png");

class Planner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fromData: {},
      toData: {},
      nearByBikePoints: []
    };
  }

  componentDidMount() {
    let fromLocation;

    if (this.props.match.params.location) {
      fromLocation = data.filter(item => {
        return item.id === this.props.match.params.location;
      })[0];
    }

    if (!fromLocation) {
      return;
    }

    this.setState({
      loading: true,
      fromData: fromLocation
    });

    getNearByBikePoints(fromLocation)
      .then(res => {
        this.setState({
          nearByBikePoints: res
        });
      })
      .catch(err => {
        console.log("err", err);
      })
      .then(() => {
        this.setState({ loading: false });
        this.props.closeDrawer();
      });
  }

  getBikeStationFromList(id) {
    return data.filter(item => {
      return item.id === id;
    })[0];
  }

  toBikeStationHandler = id => {
    const bikeStation = this.getBikeStationFromList(id);
    if (!bikeStation) {
      return;
    }
    this.setState({
      toData: bikeStation
    });
  };

  render() {
    const nearByBikePoints = this.state.nearByBikePoints.map(item => {
      return (
        <ListItem
          key={item.id}
          onClick={() => this.toBikeStationHandler(item.id)}
          primaryText={item.commonName}
          secondaryText={
            <p>
              Bikes ({item.nbBikes}) Spaces ({item.nbEmptyDocks})
            </p>
          }
        />
      );
    });

    return (
      <div>
        <label htmlFor="from">From Bicycle Docking Station</label>
        <input
          className={classes["u-full-width"]}
          type="text"
          placeholder="From..."
          id="from"
          value={this.state.fromData.commonName}
          readOnly
        />
        <label htmlFor="to">To Bicycle Docking Station</label>
        <input
          className={classes["u-full-width"]}
          type="text"
          placeholder="Tap to specify the end..."
          id="to"
          value={this.state.toData.commonName}
          readOnly
        />
        <br />

        <RaisedButton
          label="Plan my Journey"
          primary={true}
          disabled={!this.state.toData.commonName}
        />

        {this.state.loading === true ? (
          <div>
            <br />
            <p>
              <strong>Loading near by bike points</strong>
            </p>
          </div>
        ) : (
          ""
        )}

        <List>
          <Subheader>Where shall we dock?</Subheader>
          {nearByBikePoints}
        </List>
      </div>
    );
  }
}

export default Planner;
