import { useEffect, useRef } from "react";

export const useCache = (paginate, data, query) => {
  const queryCache = useRef({});

  const checkData = () => {
    if (queryCache.current[query] && queryCache.current[query][paginate])
      return queryCache.current[query][paginate];
  };

  useEffect(() => {}, []);

  return checkData;
};
