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
  const queryCache = useRef({});
  const debouncedSearch = useDebounce(query, 250);

  if (query === "") {
    setQuery(-1);
    setData([]);
    setPaginate(1);
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

        cachedData = getCache(query, paginate);

        if (!cachedData) {
          const { data } = await axios.get(
            `https://www.breakingbadapi.com/api/characters?name=${debouncedSearch}&limit=5&offset=${
              paginate - 1
            }`
          );
          if (data.length > 0) {
            setData(data);
            setCache(query, paginate, data);
          }
        } else {
          setData(cachedData);
        }

        setLoading(false);
      } catch (error) {
        return error;
      }
      setLoading(false);
    };

    if (debouncedSearch.length > 2 && paginate) fetchData();
  }, [debouncedSearch, paginate]);

  return (
    <div className="main">
      <h1>Breaking Bad Characters</h1>
      <div className="container">
        <Search setQuery={setQuery} />
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
              paginate={setPaginate}
              setPaginate={setPaginate}
              name="Back"
            />
            <Button
              Data={Data}
              paginate={setPaginate}
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
