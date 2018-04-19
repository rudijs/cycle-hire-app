import _ from "lodash";

const initialState = {
    items: [
        {
            name: "London",
            lat: 51.508530,
            lon: -0.076132
        },
        {
            name: "Hong Kong",
            lat: 22.396428,
            lon: 114.109497
        }
    ],
    selected: undefined
};

const reducerCountryCoordinates = (state = initialState, action) => {
    switch(action.type) {
        case "SELECT_COUNTRY_COORDINATE":
            state = Object.assign({}, state, {selected: action.payload});
            return state;
        default:
            state = Object.assign({}, state, { selected: _.head(state.items) });
            return state;
    }
};

export default reducerCountryCoordinates;