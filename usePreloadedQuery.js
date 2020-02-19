import useDataFilter from "./useDataFilter";
/*
 * React hook to retrieve data from a preloaded query
 *
 * @param {Object} preloadedQuery - return value from ``preloadQuery``
 * @param {Object|Function} filterParams - optional argument to use different filter parameters in the redux query
 */
const usePreloadedQuery = (preloadedQuery, filterParams) => {
  const data = useDataFilter(preloadedQuery, filterParams);
  return data;
};

export default usePreloadedQuery;
