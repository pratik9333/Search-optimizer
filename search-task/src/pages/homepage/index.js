import React, { useState, useEffect } from "react";
import "./styles.modules.css";

// helper functions
import { fetchCharacters, fetchCharactersByName, loading } from "./helpers";

// components
import Card from "../../components/card";

const Homepage = () => {
  const [Data, setData] = useState();
  const [Loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState();
  const [paginate, setPaginate] = useState(0);

  const customStyle = {
    gridTemplateColumns:
      Loading || Data?.length == 0 ? "repeat(1, 1fr)" : "repeat(3, 1fr)",
  };

  useEffect(() => {
    const getCharacters = async () => {
      setLoading(true);
      try {
        let characters;
        if (!inputData) {
          characters = await fetchCharacters(paginate);
        } else {
          characters = await fetchCharactersByName(inputData, paginate);
        }
        setData(characters);
      } catch (error) {
        alert(error.message);
      }
      setLoading(false);
    };
    getCharacters();
  }, [paginate, inputData]);

  return (
    <div className="main">
      <h1>Breaking Bad Characters</h1>
      <div className="container">
        <div className="search-box">
          <input
            onChange={(e) => {
              setInputData(e.target.value);
            }}
            type="text"
            placeholder="Search Characters..."
            id="text"
          />
        </div>
        <div className="searched-results" style={customStyle}>
          {Loading ? (
            loading
          ) : Data && Data?.length > 0 ? (
            Data?.map((data) => (
              <Card key={data.char_id} name={data.name} image={data.img} />
            ))
          ) : (
            <h2 style={{ textAlign: "center" }}>No Data Found :(</h2>
          )}
        </div>
        <div className="pagination">
          <div className="text">
            <h3>
              Viewing {paginate + 1} - {paginate + 5}
            </h3>
          </div>
          <div className="button">
            <button
              onClick={() => {
                setPaginate(paginate - 5);
              }}
              disabled={paginate === 0 ? true : false}
            >
              Back
            </button>
            <button
              onClick={() => {
                setPaginate(paginate + 5);
              }}
              disabled={
                Data !== undefined && Data.length > 0 && Data?.length < 5
              }
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
