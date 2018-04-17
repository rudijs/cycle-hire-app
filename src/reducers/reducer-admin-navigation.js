import DashboardContainer from "../containers/admin/modules/Dashboard";
import UserDashboardContainer from "../containers/user/Dashboard";

const profile = JSON.parse(localStorage.getItem('profile'));

const navigation = () => {
    const items = [
        {
            name: "Dashboard",
            url: "/dashboard",
            container: ( !!profile && !!profile.user_metadata && profile.user_metadata.permission === "administrator" ? DashboardContainer : UserDashboardContainer),
            permission: !!profile && !!profile.user_metadata ? profile.user_metadata.permission : null
        },
        {
            name: "Log Out",
            url: "/",
            permission: "*"
        }
    ];
    const selected = items[0];
    return ({
        items, selected
    })
};

const findPath = (items, url ) => items.find(path => path.url === url);
const initialState = navigation.bind(this)();

const reducerAdminNavigation = (state = initialState, action) => {
    switch(action.type) {
        case "ALTER_SELECTED_NAVIGATION":
            return Object.assign({}, state, { selected: findPath(state.items, action.payload) });
        case "SHOW_COMPONENTS":
            return state;
        default:
            return state
    }
};

export default reducerAdminNavigation;