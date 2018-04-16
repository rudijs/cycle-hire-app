export const actionMapDataSource = (dataSource) => ({
   type: "SET_MAP_DATASOURCE",
   payload: dataSource
});

export const actionMapisFetching = (isTrue) => ({
    type: "IS_FETCH_DATASOURCE",
    payload: isTrue
});
