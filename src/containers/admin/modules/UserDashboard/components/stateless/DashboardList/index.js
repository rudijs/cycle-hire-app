import React from "react";
import NearbyComponent from "../Nearby";
import "./style.css";
import { CircularProgress } from "material-ui";

// const DashboardListContainer = ({ dataSource: { items } }, type = "DOCK") => {
const DashboardListContainer = props => {
  const isDock = props.type === "DOCK";

  return (
    <div className="dashboard-list-container container">
      <h4 className="title">Where shall we {isDock ? "dock" : "begin"}?</h4>
      <div className="stations-nearby">
        <h6 className="title">Stations nearby</h6>
        <div className="nearby-container">
          {props.items.length ? (
            props.items.map((data, index) => (
              <NearbyComponent dataSource={data} key={index} />
            ))
          ) : (
            <div style={style.loaderWrapper}>
              <CircularProgress size={35} style={{ marginRight: 10 }} />
              Loading stations
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const style = {
  loaderWrapper: {
    textAlign: "center",
    width: "100%"
  }
};

DashboardListContainer.defaultProps = {
  items: [],
  type: "BEGIN"
};

export default DashboardListContainer;
