import React, { Component } from "react";
import "./styles.css";
import GoogleMapHandler from "../../../components/stateful/GoogleMapHandler";
import DashboardListContainer from "./components/stateless/DashboardList/index";
import { connect } from "react-redux";
import { actionSetMapDataSource } from "../../../actions/action-map";
import ConfirmDialog from "./components/stateless/ConfirmDialog";
import MapWithADirectionsRenderer from "./components/stateless/MapWithADirectionsRenderer";
import bikeIcon from "./images/bike-directions-icon.png";

class UserDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerToSelect: null,
      beginningStation: null,
      dockingStation: null
    };
  }

  componentDidMount() {
    this.getBikepoints();
  }

  getBikepoints = () => {
    const { dataSource, actionSetMapDataSource } = this.props;
    if (!dataSource.items.length) actionSetMapDataSource();
  };

  footer = dataSource => {
    if (this.state.markerToSelect == null) {
      return (
        <DashboardListContainer
          type={this.state.beginningStation ? "DOCK" : "BEGIN"}
          dataSource={dataSource}
          onClick={this._onListItemClick}
        />
      );
    } else {
      return (
        <ConfirmDialog
          type={this.state.beginningStation == null ? "BEGIN" : "DOCK"}
          station={this.state.markerToSelect}
          onCancelClick={this._onCancelClick}
          onSelectClick={this._onSelectClick}
        />
      );
    }
  };

  _onListItemClick = marker => {
    this.setState({ markerToSelect: marker });
  };

  _onMarkerClick = event => {
    const { marker } = event;
    this.setState({ markerToSelect: marker });
  };

  _onMarkerClusterClick = () => {};

  _onCancelClick = () => {
    this.setState({ markerToSelect: null });
  };

  _onSelectClick = () => {
    const updatedStation =
      this.state.beginningStation == null
        ? { beginningStation: this.state.markerToSelect }
        : { dockingStation: this.state.markerToSelect };
    this.setState({ ...updatedStation, markerToSelect: null });
  };

  _clearStation = station => {
    this.setState({ [station]: null });
  };

  render() {
    const { dataSource } = this.props;

    return (
      <div className="dashboard-container">
        {this.state.beginningStation ? (
          <p style={{ paddingLeft: 20 }}>
            <img src={bikeIcon} alt="Bike Icon" /><i>From:</i>
            {this.state.beginningStation.commonName}
            <span
              className="clear-station"
              onClick={() => {
                this._clearStation("beginningStation");
              }}
            >
              X
            </span>
          </p>
        ) : (
          ""
        )}
        {this.state.dockingStation ? (
          <p style={{ paddingLeft: 20 }}>
            <img src={bikeIcon} alt="Bike Icon" /><i>To:</i>
            {this.state.dockingStation.commonName}
            <span
              className="clear-station"
              onClick={() => {
                this._clearStation("dockingStation");
              }}
            >
              X
            </span>
          </p>
        ) : (
          ""
        )}
        {this.state.beginningStation && this.state.dockingStation ? (
          <MapWithADirectionsRenderer
            beginningStation={this.state.beginningStation}
            dockingStation={this.state.dockingStation}
          />
        ) : (
          <GoogleMapHandler
            onMarkerClick={this._onMarkerClick}
            onMarkerClusterClick={this._onMarkerClusterClick}
            dataSource={dataSource}
            containerStyle={{ height: "400px" }}
          />
        )}
        {this.footer(dataSource)}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actionSetMapDataSource: () => actionSetMapDataSource(dispatch)
});

const mapStateToProps = state => ({
  dataSource: state.reducerMapDatasource
});

export default connect(mapStateToProps, mapDispatchToProps)(
  UserDashboardContainer
);
