import React, { Component } from 'react';
import './styles.css';
import GoogleMapHandler from "../../../../components/stateful/GoogleMapHandler";
import DashboardListContainer from "./components/stateless/DashboardList/index";

export default class UserDashboardContainer extends Component {

    render() {
        return (
            <div className="dashboard-container">
                <GoogleMapHandler />
                <DashboardListContainer />
            </div>
        )
    }
}