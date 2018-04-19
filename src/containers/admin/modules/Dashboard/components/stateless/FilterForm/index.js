import React, { Component } from "react";
import {DatePicker, MenuItem, RaisedButton, SelectField} from "material-ui";
import PropTypes from "prop-types";

import theme from "./themeStyle";
import "./style.css";
import Ionicon from "react-ionicons";
import {connect} from "react-redux";
import {actionChangeSelectedCoordinate} from "../../../../../../../actions/action-country-coordinates";


class FilterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedStation: null,
            dateFrom: new Date(),
            dateTo: new Date()
        }
    }


    onChangeAreaHandler = (event, index, value) => this.props.actionChangeSelectedCoordinate(value);
    onChangeStationHandler = (event, index, value) => {
        const { name } = this.props.countryCoordinates.selected;
        const { lat, lon } = value;
        this.setState({ selectedStation: value });
        this.props.actionChangeSelectedCoordinate({ name, lat, lon });
    };

    onChangeFromHandler = (event, date) => {
        const datum = new Date(date);
        console.log(datum.getTime())
    };

    onChangeToHandler = (event, date) => {
        const datum = new Date(date);
        console.log(datum.getTime())
    };

    render() {
        const { dataSource: { items }, countryCoordinates } = this.props;
        const stations = items.map(item => ({ id: item.id, name: item.commonName, lat: item.lat, lon: item.lon }));

        return (
            <div className="filter-form-container container-fluid clearfix">
                <div className="date-picker-container row">
                    <div className="date-picker-container col-6">
                        <div className="column">
                            <span>From</span>
                            <div className="row">
                                <div className="col-9" style={{ paddingRight: 0 }}>
                                    <DatePicker
                                        dialogContainerStyle={theme.dialogContainer}
                                        className="date-picker"
                                        hintStyle={theme.formInput}
                                        hintText="DD/MM/YYYY"
                                        mode="portrait"
                                        maxDate={new Date()}
                                        onChange={this.onChangeFromHandler}
                                    />
                                </div>
                                <div className="col-3">
                                    <Ionicon
                                        icon="ios-calendar-outline"
                                        fontSize="20px"
                                        color="#ffffff"
                                        style={{ marginTop: 11 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="date-picker-container col-6">
                        <div className="column">
                            <span>To</span>
                            <div className="row">
                                <div className="col-9" style={{ paddingRight: 0}}>
                                    <DatePicker
                                        dialogContainerStyle={theme.dialogContainer}
                                        className="date-picker"
                                        hintStyle={theme.formInput}
                                        hintText="DD/MM/YYYY"
                                        mode="portrait"
                                        maxDate={new Date()}
                                        onChange={this.onChangeToHandler}
                                    />
                                </div>
                                <div className="col-3">
                                    <Ionicon
                                        icon="ios-calendar-outline"
                                        fontSize="20px"
                                        color="#ffffff"
                                        style={{ marginTop: 11 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-area-container container-fluid clearfix">
                    <div className="column">
                        <span className="clearfix">Area</span>
                        <SelectField
                            labelStyle={theme.formInput}
                            onChange={this.onChangeAreaHandler}
                            fullWidth={true}
                            value={items.length && countryCoordinates.items.length ? countryCoordinates.selected: null}
                            disabled={!(items.length && countryCoordinates.items.length)}
                        >
                            <MenuItem
                                value={items.length && countryCoordinates.items.length ? countryCoordinates.selected: null}
                                label={items.length && countryCoordinates.items.length ? countryCoordinates.selected.name : "Loading Area..."}
                                primaryText={items.length && countryCoordinates.items.length ? countryCoordinates.selected.name : "Loading Area..."}
                            />

                            {
                                countryCoordinates.items.length ?
                                    countryCoordinates.items.filter(item => item.name !== countryCoordinates.selected.name).map(
                                        (item, index) =>
                                            <MenuItem
                                                key={index}
                                                value={item}
                                                label={item.name}
                                                primaryText={item.name}
                                            />
                                    )
                                    :
                                    null
                            }

                        </SelectField>
                    </div>
                </div>
                <div className="form-docking-station-container container-fluid clearfix">
                    <div className="column">
                        <span className="clearfix">Docking station</span>
                        <SelectField
                            labelStyle={theme.formInput}
                            onChange={this.onChangeStationHandler}
                            fullWidth={true}
                            value={this.state.selectedStation}
                        >
                            <MenuItem
                                value={this.state.selectedStation}
                                label={stations.length ? this.state.selectedStation ? this.state.selectedStation.name : "Select Station" : "Loading Stations..."}
                                primaryText={stations.length ? this.state.selectedStation ? this.state.selectedStation.name : "Select Station" : "Loading Stations..."}
                            />

                            {
                                stations.length ?
                                    stations.map(
                                        (item, index) =>
                                        {
                                            if(countryCoordinates.selected.id === item.id) {
                                                return <MenuItem
                                                    key={index}
                                                    value={item}
                                                    label={item.name}
                                                    primaryText={item.name}
                                                />
                                            }
                                        }
                                    )
                                    :
                                    null
                            }

                        </SelectField>
                    </div>
                </div>
                <div className="reset-button-container container-fluid clearfix">
                    <RaisedButton
                        label="Reset"
                        labelColor="#283f89"
                        className="float-right"
                    />
                </div>
            </div>
        );
    }
}

FilterForm.propTypes = {
    onStationChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    dataSource: state.reducerMapDatasource,
    countryCoordinates: state.reducerCountryCoordinates
});

const mapDispatchToProps = dispatch => ({
    actionChangeSelectedCoordinate: payload => dispatch(actionChangeSelectedCoordinate(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);