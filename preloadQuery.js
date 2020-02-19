import useDatafilter from "./useDataFilter";
import QueryObject from "./QueryObject";

/*
 * Basic function that will make a network request and return an object that has request details
 *
 * @param {Object} api - valid api class. Must have query function and data type specified
 * @param {Object} - optional argument for arguments passed to the network request
 */
const preloadQuery = (api, queryParams) => {
  const queryData = new QueryObject({ api, apiParams: queryParams });
  queryData.initializeRequest();

  return queryData;
};

export default preloadQuery;
