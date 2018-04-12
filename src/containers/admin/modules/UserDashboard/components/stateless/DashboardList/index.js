import React from 'react';
import NearbyComponent from "../Nearby/index";
import './style.css';

const DashboardListContainer = () =>
(
    <div className="dashboard-list-container container">
        <h4 className="title">Where shall we begin?</h4>
        <div className="stations-nearby">
            <h6 className="title">Stations nearby</h6>
            <div className="nearby-container">
                <NearbyComponent/>
                <NearbyComponent/>
                <NearbyComponent/>
                <NearbyComponent/>
                <NearbyComponent/>
            </div>
        </div>
    </div>
);

export default DashboardListContainer