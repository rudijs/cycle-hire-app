import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import RaisedButton from "material-ui/RaisedButton";
import ActionInfo from "material-ui/svg-icons/action/info";
import Avatar from "material-ui/Avatar";

import classes from "../../assets/css/skeleton.css";
import localClasses from "./Planner.css";

import data from "../../tmp/bike_point.json";
import getNearByBikePoints from "./nearByBikePoints";

const nearByMap = require("../../assets/images/near-by-map.png");
const bikeIcon = require("../../assets/images/bike-icon.png");

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
    console.log(101, bikeStation);
    this.setState({
      toData: bikeStation
    });
  };

  cancelHander = () => {
    this.setState({
      toData: { commonName: "" }
    });
  };

  render() {
    const nearByBikePoints = this.state.nearByBikePoints.map(item => {
      return (
        <ListItem
          key={item.id}
          onClick={() => this.toBikeStationHandler(item.id)}
          leftAvatar={<Avatar src={bikeIcon} />}
          rightIcon={<ActionInfo />}
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
        {/* <label htmlFor="from">From Bicycle Docking Station</label> */}
        <input
          className={classes["u-full-width"]}
          type="text"
          placeholder="From..."
          id="from"
          value={this.state.fromData.commonName}
          readOnly
        />

        {/* <label htmlFor="to">To Bicycle Docking Station</label> */}
        <input
          className={classes["u-full-width"]}
          type="text"
          placeholder="Type or choose below to specify the end..."
          id="to"
          value={this.state.toData.commonName}
          readOnly
        />

        <img src={nearByMap} alt="Map" />

        {this.state.toData.commonName ? (
          <div className={localClasses.confirmDock}>
            <h4>Dock in this Station?</h4>
            <div className={localClasses.confirmCallToAction}>
              <p className={localClasses.toBikeStation}>
                <strong>{this.state.toData.commonName}</strong>
                <br />
                <span>Bikes (00) Spaces (00)</span>
              </p>
              <RaisedButton
                label="Cancel"
                onClick={this.cancelHander}
                style={{ marginRight: 10 }}
              />

              <RaisedButton
                label="Select"
                disabled={!this.state.toData.commonName}
              />
            </div>
          </div>
        ) : (
          ""
        )}

        {!this.state.toData.commonName ? (
          <React.Fragment>
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
            <h4>Where shall we dock?</h4>
            <List>
              <Subheader>Stations near your destination</Subheader>
              {nearByBikePoints}
            </List>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Planner;
