import { useSelector } from 'react-redux';
import { useCallback, useMemo } from "react";

const applyFilter = (_data, filter) => {
  let data = _data;
  if (!Array.isArray(data)) {
    data = Object.values(data);
  }
  if (typeof filter === 'function') {
    return data.filter(filter);
  }
  const keys = Object.keys(filter);
  return data.filter(elem => {
    let valid = true;
    keys.forEach(key => {
      if (typeof filter[key] === 'function') {
        valid = valid && filter[key](elem[key]);
      } else {
        valid = valid && filter[key] === elem[key];
      }
    });
    return valid;
  });
};

const useDataFilter = (queryData, filterParams) => {
  const selector = useCallback(state => state[queryData.reduxDataType], [queryData.reduxDataType]);
  const data = useSelector(selector);

  const parsedData = useMemo(() => {
    let _data = data;
    const filter = filterParams || queryData.apiParams;
    if (filter) {
      if (Array.isArray(filter)) {
        filter.forEach(param => {
          _data = applyFilter(_data, param);
        });
      } else {
        _data = applyFilter(_data, filter);
      }
    } 
    return _data;
  }, [filterParams, queryData.apiParams, data]);

  const result = queryData.retrieveResult();

  return parsedData || result;
};

export default useDataFilter;
