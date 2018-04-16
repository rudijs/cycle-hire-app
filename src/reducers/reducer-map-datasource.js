const initialstate = {
    isFetching: false,
    items: []
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
            state.items = action.payload;
            return state;
        default:
            return state
    }
};

export default reducerMapDatasource;