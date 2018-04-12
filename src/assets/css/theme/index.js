// More on Colors: http://www.material-ui.com/#/customization/colors
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { indigo500 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    appBar: {
        height: 50,
        color: indigo500
    }
});

export default muiTheme;