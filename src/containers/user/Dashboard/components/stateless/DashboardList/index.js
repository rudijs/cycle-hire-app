import React from 'react';
import NearbyComponent from "../Nearby/index";
import './style.css';
import {CircularProgress} from "material-ui";

const DashboardListContainer = ({ type, dataSource: { items }, onClick }) => {
    return (
        <div className="dashboard-list-container container">
            <h4 className="title">Where shall we { type === "DOCK" ? "dock" : "begin"} ?</h4>
            <div className="stations-nearby">
                <h6 className="title">Stations nearby</h6>
                <div className="nearby-container">
                    {
                        items.length ?
                            items.map((data, index) => <NearbyComponent dataSource={data} key={index} onClick={onClick} />)
                            :
                            <div style={style.loaderWrapper}>
                                <CircularProgress
                                    size={35}
                                    style={{ marginRight: 10 }}
                                />
                                Loading stations
                            </div>
                    }
                </div>
            </div>
        </div>
    )
};

const style={
    loaderWrapper: {
        textAlign: "center",
        width: "100%",
    }
};

DashboardListContainer.defaultProps = {
    dataSource: {
        items: [],
        type: "BEGIN"
    }
};

export default DashboardListContainer