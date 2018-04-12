import { createStore, combineReducers } from "redux";
import reducerAdminNavigation from "./reducer-admin-navigation";

const allReducers = combineReducers({
    reducerAdminNavigation
});

const store = createStore(allReducers);

export default store ;