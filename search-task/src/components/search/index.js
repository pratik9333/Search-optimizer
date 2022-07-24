import React from "react";

import "./styles.modules.css";

const Search = (props) => {
  //

  const handleText = (e) => {
    props.setQuery(e.target.value);
    props.setPaginate(0);
  };

  //
  return (
    <div className="search-box">
      <input
        onChange={handleText}
        type="text"
        placeholder="Search Characters..."
        id="text"
      />
    </div>
  );
};

export default Search;
