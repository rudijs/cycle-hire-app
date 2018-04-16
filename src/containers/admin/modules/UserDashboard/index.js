import React, { Component } from 'react';
import './styles.css';
import GoogleMapHandler from "../../../../components/stateful/GoogleMapHandler";
import DashboardListContainer from "./components/stateless/DashboardList/index";
import {connect} from "react-redux";
import {actionMapDataSource, actionMapisFetching} from "../../../../actions/action-map";
import axios from "axios/index";

class UserDashboardContainer extends Component {

    componentDidMount() {
        this.getBikepoints();
    }

    getBikepoints = () => {
        this.props.actionMapisFetching(true);
        axios.get("https://tajz77isu1.execute-api.us-east-1.amazonaws.com/dev/bikepoint", {
            responseType: 'json'
        })
        .then(response => {
            this.props.actionMapDataSource(response.data);
            this.props.actionMapisFetching(false);
            this.setState({ commonName: null });
        })
        .catch(error => {
            alert(error)
        });
    };

    render() {

        const { dataSource } = this.props;

        return (
            <div className="dashboard-container">
                <GoogleMapHandler dataSource={dataSource} />
                <DashboardListContainer dataSource={dataSource} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actionMapDataSource: (dataSrouce) => dispatch(actionMapDataSource(dataSrouce)),
    actionMapisFetching: (isTrue) => dispatch(actionMapisFetching(isTrue))
});


const mapStateToProps = state => ({
    dataSource: state.reducerMapDatasource
});
export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardContainer)