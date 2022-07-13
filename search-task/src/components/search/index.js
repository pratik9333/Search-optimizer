import React from "react";

import "./styles.modules.css";

const Search = (props) => {
  return (
    <div className="search-box">
      <input
        onChange={(e) => {
          props.setQuery(e.target.value);
        }}
        type="text"
        placeholder="Search Characters..."
        id="text"
      />
    </div>
  );
};

export default Search;
