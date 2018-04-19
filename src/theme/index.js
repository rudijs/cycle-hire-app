// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { indigo50 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
        primaryColor: indigo50
    },
    appBar: {
        height: 50,
        backgroundColor: indigo50
    },
    menuItem: {
        textColor: indigo50,
    }
});

export default muiTheme;