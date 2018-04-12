import DashboardContainer from "../containers/admin/modules/Dashboard";
import UserDashboardContainer from "../containers/admin/modules/UserDashboard";

const navigation = () => {
    const items = [
        {
            name: "Dashboard",
            url: "/admin/dashboard",
            container: DashboardContainer,
            permission: "admin"
        },
        {
            name: "User Dashboard",
            url: "/admin/user/dashboard",
            container: UserDashboardContainer,
            permission: "admin"
        },
        {
            name: "Log In",
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