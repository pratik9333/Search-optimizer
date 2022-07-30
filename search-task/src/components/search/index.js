import React from "react";

import "./styles.modules.css";

const Search = (props) => {
<<<<<<< HEAD
  return (
    <div className="search-box">
      <input
        onChange={props.onChange}
=======
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
>>>>>>> de557eb573a1e03f50f82e8813ef74f6b8d0c877
        type="text"
        placeholder="Search Characters..."
        id="text"
      />
    </div>
  );
};

export default Search;
