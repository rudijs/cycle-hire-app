import _ from "lodash";

const initialstate = {
    isFetching: false,
    items: [],
    usedStations: [],
    filteredStations: [],
    selected: {}
};

const dates = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

const randomTemperature = ()=> {
    // Time of day 24 hour
    const time = 12;
    // Base temperature for the day
    const tempBase = Math.floor(Math.random() * 75) + 1;
    // Fluctuations, multiplied with base temperature, indices correspond to hour of the day
    const fluc = [0, 1, 1, 2, 1, 1, 2.5, 3.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    // Work out the temperature of the given day for the given hour 24 format
    return tempBase * fluc[time];
};

const reducerMapDatasource = (state = initialstate, action) => {
    switch (action.type) {
        case "APPEND_MAP_DATASOURCE":
            state = [...state.items, ...action.payload];
            return state;
        case "IS_FETCHING_DATASOURCE":
            state = Object.assign({}, state, { isFetching: action.isTrue });
            return state;
        case "SET_MAP_DATASOURCE":
            state = Object.assign({}, state, { items: action.payload.map(item => {
                    let totalJourney = 0;
                    const usage = dates.map(date => {
                        let bikeSpaces = 20;
                        const bikes = Math.floor(Math.random() * 15) + 1;
                        const randomJourney = Math.floor(Math.random() * 200);
                        totalJourney += randomJourney;

                        return {
                            date,
                            spaces: bikeSpaces,
                            bikes,
                            journeys: randomJourney,
                            temperature: randomTemperature()
                        }
                    });
                    return Object.assign({}, item, {usage}, {totalJourney: totalJourney});
                })
            });
            return state;
        case "SET_MAP_FILTER_BY_SIZE":
            state = Object.assign({}, state, {filteredStations: _.cloneDeep(state.items).slice(0, action.size)});
            return state;
        case "SELECT_MAP_DATASOURCE":
            state = Object.assign({}, state, { selected: action.payload });
            return state;
        case "SET_TOP_DATASOURCE":
            state = Object.assign({}, state, { usedStations: action.payload });
            return state;
        default:
            return state
    }
};

export default reducerMapDatasource;