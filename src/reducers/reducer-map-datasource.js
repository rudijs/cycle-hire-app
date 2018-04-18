const initialstate = {
    isFetching: false,
    items: [],
    usedStations: []
};

const reducerMapDatasource = (state = initialstate, action) => {
    switch (action.type) {
        case "APPEND_MAP_DATASOURCE":
            state = [...state.items, ...action.payload];
            return state;
        case "IS_FETCH_DATASOURCE":
            state.isFetching = action.payload;
            return state;
        case "SET_MAP_DATASOURCE":
            state.items = action.payload.map(item => {
                let bikeSpaces = 20;
                const bikes = Math.floor(Math.random() * 15) + 1;
                const randomJourney = Math.floor(Math.random() * 200);

                item.spaces = bikeSpaces - bikes;
                item.bikes = bikes;
                item.journeys = randomJourney;
                return item;
            });

            return state;
        case "SET_TOP_DATASOURCE":
            state = Object.assign({}, state, { usedStations: action.payload });
            return state;
        default:
            return state
    }
};

export default reducerMapDatasource;