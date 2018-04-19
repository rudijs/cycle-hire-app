import { createStore, combineReducers, applyMiddleware } from "redux";
import reducerAdminNavigation from "./reducer-admin-navigation";
import reducerMapDatasource from "./reducer-map-datasource";
import reducerCountryCoordinates from "./reducer-country-coordinates";
import thunk from 'redux-thunk';

const allReducers = combineReducers({
    reducerAdminNavigation,
    reducerMapDatasource,
    reducerCountryCoordinates
});

const store = createStore(allReducers, applyMiddleware(thunk));

export default store ;