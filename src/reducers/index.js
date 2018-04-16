import { createStore, combineReducers } from "redux";
import reducerAdminNavigation from "./reducer-admin-navigation";
import reducerMapDatasource from "./reducer-map-datasource";

const allReducers = combineReducers({
    reducerAdminNavigation,
    reducerMapDatasource
});

const store = createStore(allReducers);

export default store ;