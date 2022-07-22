import React from "react";

import "./styles.modules.css";

const Search = (props) => {
  //

  const handleText = (e) => {
    if (e.keyCode === 8) props.onKeyDown(true);
    props.setQuery(e.target.value);
    props.setPaginate(1);
  };

  //
  return (
    <div className="search-box">
      <input
        onChange={handleText}
        onKeyDown={handleText}
        type="text"
        placeholder="Search Characters..."
        id="text"
      />
    </div>
  );
};

export default Search;
