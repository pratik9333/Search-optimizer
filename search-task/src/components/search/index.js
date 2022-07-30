import React from "react";

import "./styles.modules.css";

const Search = ({ onChange }) => {
  //
  return (
    <div className="search-box">
      <input
        onChange={onChange}
        type="text"
        placeholder="Search Characters..."
        id="text"
      />
    </div>
  );
};

export default Search;
