import React from "react";
import {IconButton, IconMenu, MenuItem} from "material-ui";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import iconMenu from "./theme";
import PropTypes from "prop-types";

const StationsIconMenu = ({ onValueChange }) =>
    (
        <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            iconStyle={iconMenu.icon}
            onItemClick={(event, child) => onValueChange(child.props.value)}
        >
            <MenuItem value={5} primaryText="Top 5" />
            <MenuItem value={10} primaryText="Top 10" />
            <MenuItem value={20} primaryText="Top 20" />
        </IconMenu>
    );

StationsIconMenu.propTypes = {
    onValueChange: PropTypes.func
};

export default StationsIconMenu;