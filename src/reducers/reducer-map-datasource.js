const initialstate = {
    isFetching: false,
    items: []
};

const randomBikesAndSpaces = ()=> {
    let spaces = 20;
    const bikes = Math.floor(Math.random() * 15) + 1;
    return { spaces: spaces - bikes , bikes }
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
            const { bikes, spaces } = randomBikesAndSpaces();
            state.items = action.payload.map(item => Object.assign({}, item, { bikes, spaces }));
            console.log(state.items);
            return state;
        default:
            return state
    }
};

export default reducerMapDatasource;