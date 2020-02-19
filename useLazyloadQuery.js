import useDatafilter from "./useDataFilter";

/*
 * React hook to fetch data from a query and return the response
 *
 * @param {Object} api - valid api class. Must have query function and data type specified
 * @param {Object} - optional argument for arguments passed to the network request
 * @param {Object|Function} filterParams - optional argument to use different filter parameters in the redux query
 */
const useLazyloadQuery = (api, queryParams, filterParams) => {
  const queryData = new QueryObject({ api, apiParams: queryParams });
  queryData.initializeRequest();

  const data = useDataFilter(queryData, filterParams);

  return data;
};

export default useLazyloadQuery;
