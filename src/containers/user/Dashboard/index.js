import React, { Component } from 'react';
import './styles.css';
import GoogleMapHandler from "../../../components/stateful/GoogleMapHandler";
import DashboardListContainer from "./components/stateless/DashboardList/index";
import { connect } from "react-redux";
import { actionMapDataSource } from "../../../actions/action-map";
import axios from "axios/index";
import ConfirmDialog from "./components/stateless/ConfirmDialog";

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
        const { actionMapDataSource } = this.props;
        axios.get("https://tajz77isu1.execute-api.us-east-1.amazonaws.com/dev/bikepoint", {
            responseType: 'json'
        })
        .then(response => {
            actionMapDataSource(response.data);
            this.setState({ commonName: null });
        })
        .catch(error =>  alert(error) );
    };

    footer = (dataSource) => {
        if (this.state.markerToSelect == null) {
            return (<DashboardListContainer dataSource={dataSource} />)
        } else {
            return (
                <ConfirmDialog
                    type={this.state.beginningStation == null ? "BEGIN" : "DOCK"}
                    station={this.state.markerToSelect}
                    onCancelClick={this._onCancelClick}
                    onSelectClick={this._onSelectClick}
                />
            )
        }
    };

    _onMarkerClick = (event) => {
        const { marker } = event;
        this.setState({ markerToSelect: marker })
    };

    _onMarkerClusterClick = () => {
    };

    _onCancelClick = () => {
        this.setState({ markerToSelect: null })
    };

    _onSelectClick = () => {
        const updatedStation = this.state.beginningStation == null ?
            { beginningStation: this.state.markerToSelect } :
            { dockingStation: this.state.markerToSelect };
        this.setState({ ...updatedStation, markerToSelect: null })
    };

    render() {

        const { dataSource } = this.props;

        return (
            <div className="dashboard-container">
                <GoogleMapHandler
                    onMarkerClick={this._onMarkerClick}
                    onMarkerClusterClick={this._onMarkerClusterClick}
                    dataSource={dataSource}
                />
                {this.footer(dataSource)}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actionMapDataSource: (dataSrouce) => dispatch(actionMapDataSource(dataSrouce))
});

const mapStateToProps = state => ({
    dataSource: state.reducerMapDatasource
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardContainer)