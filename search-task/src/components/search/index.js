import React from "react";

import "./styles.modules.css";

const Search = (props) => {
  return (
    <div className="search-box">
      <input
        onChange={props.onChange}
        type="text"
        placeholder="Search Characters..."
        id="text"
      />
    </div>
  );
};

export default Search;
