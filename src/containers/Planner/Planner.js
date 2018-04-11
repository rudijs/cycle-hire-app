import React from "react";

import classes from "../../assets/css/skeleton.css";

import data from "../../tmp/bike_point.json";
const nearByBikeStations = require('../../assets/images/tmp-near-by-locations.png')

const planner = props => {
  let fromData = [];
  let fromText = '';

  if (props.match.params.location) {
    fromData = data.filter(item => {
      return item.id === props.match.params.location 
    });
  }

  if(fromData.length) {
    fromText = fromData[0].commonName
  }

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
        value={fromText}
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

      <br />
      <img src={nearByBikeStations} alt="Near By Bike Stations" />
    </div>
  );
};

export default planner;
