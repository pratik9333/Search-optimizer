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
  const [data, setData] = useState([]);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState(0);

  // custom hooks
  const debouncedValue = useDebounce(query, 650);

  const queryCache = useRef({});
  const cancelToken = useRef();

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

  //handle text
  const handleText = (e) => {
    setPaginate(0);
    setQuery(e.target.value);
  };

  useEffect(() => {
    //

    const fetchData = async () => {
      setLoading(true);

      try {
        //

        let cachedData = getCache(debouncedValue, paginate);

        if (!cachedData) {
          //

          if (typeof cancelToken.current != typeof undefined)
            cancelToken.current.cancel();

          cancelToken.current = axios.CancelToken.source();

          const { data } = await axios.get(
            `https://www.breakingbadapi.com/api/characters?name=${debouncedValue}&limit=5&offset=${paginate}`,
            { cancelToken: cancelToken.current.token }
          );

          setData(data);

          if (data.length > 0) setCache(debouncedValue, paginate, data);

          //
        } else {
          setData(cachedData);
        }

        //
      } catch (error) {
        //console.log(error.message);
      }
      setLoading(false);
    };

    // note - change length > 0 if wanted to see paginated results.
    if (debouncedValue.length > 2) fetchData();
    else if (debouncedValue.length > 0 && debouncedValue.length < 3) return;
    else fetchData();

    // eslint-disable-next-line
  }, [debouncedValue, paginate]);

  return (
    <div className="main">
      <h1>Breaking Bad Characters</h1>
      <div className="container">
        <Search onChange={handleText} />
        {loading ? (
          <Loader />
        ) : (
          <div className="searched-results">
            {Array.isArray(data) &&
              data.length > 0 &&
              data?.map((data) => (
                <Card key={data.char_id} name={data.name} image={data.img} />
              ))}
          </div>
        )}
        {!loading && data.length === 0 && <h1>No Data Found !</h1>}
        <div className="pagination">
          <div className="button">
            <Button
              onClick={() => setPaginate(paginate - 5)}
              disabled={paginate === 0 || loading}
              text="Back"
            />
            <Button
              onClick={() => setPaginate(paginate + 5)}
              disabled={data.length < 5 || loading}
              text="Load-More"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
