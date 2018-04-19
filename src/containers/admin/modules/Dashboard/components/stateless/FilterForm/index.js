import React, { Component } from "react";
import {DatePicker, MenuItem, RaisedButton, SelectField} from "material-ui";
import PropTypes from "prop-types";

import theme from "./themeStyle";
import "./style.css";
import Ionicon from "react-ionicons";
import {connect} from "react-redux";
import {actionChangeSelectedCoordinate} from "../../../../../../../actions/action-country-coordinates";


class FilterForm extends Component {

    onChangeAreaHandler = (event, index, value) => this.props.actionChangeSelectedCoordinate(value);

    render() {
        const { onChangeHandler, dataSource: { items }, countryCoordinates } = this.props;
        const stations = items.map(item => ({ name: item.commonName }));

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
                            value={countryCoordinates.items.length ? countryCoordinates.selected: null}
                        >
                            <MenuItem
                                value={countryCoordinates.items.length ? countryCoordinates.selected: null}
                                label={countryCoordinates.items.length ? countryCoordinates.selected.name : "Loading Stations..."}
                                primaryText={countryCoordinates.items.length ? countryCoordinates.selected.name : "Loading Stations..."}
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
                            onChange={onChangeHandler}
                            fullWidth={true}
                            value={null}
                        >
                            <MenuItem
                                value={null}
                                label={stations.length ? "Select Station" : "Loading Stations..."}
                                primaryText={stations.length ? "Select Station" : "Loading Stations..."}
                            />

                            {
                                stations.length ?
                                    stations.map(
                                        (item, index) =>
                                            <MenuItem
                                                key={index}
                                                value={index}
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