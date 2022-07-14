import React, { useState, useEffect, useRef } from "react";

import "./styles.modules.css";

// components
import Card from "../../components/card";

import Search from "../../components/search";
import Button from "../../components/button";
import Loader from "../../components/loader";
import useDebounce from "./useDebounce";
import axios from "axios";

const Homepage = () => {
  const [Data, setData] = useState([]);
  const [paginate, setPaginate] = useState(1);
  const [query, setQuery] = useState(-1);
  const [Loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(query, 850);

  const queryCache = useRef({});
  const cancelToken = useRef();

  if (query === "") {
    setData([]);
    setQuery(-1);
  }

  // to set the data into cache
  const setCache = (query, paginate, data) => {
    const currData = { [paginate]: data };
    queryCache.current[query] = { ...queryCache.current[query], ...currData };
  };

  // to fetch cached data
  const getCache = (query, paginate) => {
    if (queryCache.current[query] && queryCache.current[query][paginate]) {
      return queryCache.current[query][paginate];
    } else {
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let cachedData = null;

        cachedData = getCache(debouncedSearch, paginate);

        if (typeof cancelToken.current != typeof undefined) {
          cancelToken.current.cancel("Operation canceled due to new request.");
        }

        cancelToken.current = axios.CancelToken.source();

        if (!cachedData) {
          const { data } = await axios.get(
            `https://www.breakingbadapi.com/api/characters?name=${debouncedSearch}&limit=5&offset=${
              paginate - 1
            }`,
            { cancelToken: cancelToken.current.token }
          );

          setData(data);
          if (data.length > 0) setCache(debouncedSearch, paginate, data);
        } else {
          setData(cachedData);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    // note - change length > 0 if wanted to see paginated results.

    if (debouncedSearch.length > 2 && paginate) fetchData();
  }, [debouncedSearch, paginate]);

  return (
    <div className="main">
      <h1>Breaking Bad Characters</h1>
      <div className="container">
        <Search setQuery={setQuery} setPaginate={setPaginate} />
        {Loading ? (
          <Loader />
        ) : (
          <div className="searched-results">
            {Array.isArray(Data) &&
              Data.length > 0 &&
              Data?.map((data) => (
                <Card key={data.char_id} name={data.name} image={data.img} />
              ))}
          </div>
        )}
        <div>{Data.length === 0 && !Loading && <h1>No Data Found...</h1>}</div>
        <div
          className="pagination"
          style={{
            display:
              !Array.isArray(Data) || Data.length === 0 ? "none" : "flex",
          }}
        >
          <div className="button">
            <Button
              Data={Data}
              paginate={paginate}
              setPaginate={setPaginate}
              name="Back"
            />
            <Button
              Data={Data}
              paginate={paginate}
              setPaginate={setPaginate}
              name="Load More..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
