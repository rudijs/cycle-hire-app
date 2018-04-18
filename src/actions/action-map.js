export const actionSetMapDataSource = dispatch => {
    dispatch(actionMapisFetching(true));
    fetch("https://tajz77isu1.execute-api.us-east-1.amazonaws.com/dev/bikepoint")
        .then(response => response.json())
        .then(
            dataSource => dispatch({
                type: "SET_MAP_DATASOURCE",
                payload: dataSource
            })
        )
        .then(()=> dispatch(actionMapisFetching(false)))
        .catch(error => dispatch(actionMapisError(error)))
};

export const actionMapFilterBySize = size => ({
    type: "SET_MAP_FILTER_BY_SIZE",
    size
});

export const actionMapisFetching = isTrue => ({
    type: "IS_FETCHING_DATASOURCE",
    isTrue: isTrue
});

export const actionMapisError = payload => ({
    type: "IS_ERROR_FETCH_DATASOURCE",
    payload
});

export const actionMapisSuccess = isTrue => ({
    type: "IS_SUCCESS_FETCH_DATASOURCE",
    payload: isTrue
});

export const actionMapTopDataSource = number => ({
    type: "SET_TOP_DATASOURCE",
    payload: number
});
