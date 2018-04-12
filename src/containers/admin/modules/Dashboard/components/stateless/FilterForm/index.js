import React from "react";
import {DatePicker, MenuItem, RaisedButton, SelectField} from "material-ui";
import PropTypes from "prop-types";

import theme from "./themeStyle";
import "./style.css";
import Ionicon from "react-ionicons";

const FilterForm = ({ area, station }) =>
    (
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
                    value={area.default}
                    onChange={area.onChangeHandler}
                    fullWidth={true}
                >
                    <MenuItem value="London" label="London" primaryText="London" />
                    <MenuItem value="Others" label="Others" primaryText="Others" />
                </SelectField>
            </div>
        </div>
        <div className="form-docking-station-container container-fluid clearfix">
            <div className="column">
                <span className="clearfix">Docking station</span>
                <SelectField
                    labelStyle={theme.formInput}
                    value={station.default}
                    onChange={station.onChangeHandler}
                    fullWidth={true}
                >
                    <MenuItem value="AllStations" label="All Stations" primaryText="All Stations" />
                    <MenuItem value="OtherStations" label="Other Stations" primaryText="Other Stations" />
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

FilterForm.propTypes = {
    area: PropTypes.shape({
        default: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.string),
        onChangeHandler: PropTypes.func.isRequired
    }),
    station: PropTypes.shape({
        default: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.string),
        onChangeHandler: PropTypes.func.isRequired
    })
};

export default FilterForm;