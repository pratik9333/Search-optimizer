import React from "react";

import "./styles.modules.css";

const Card = ({ name, image }) => {
  return (
    <div className="card">
      <div className="image">
        <img src={image} alt="" />
      </div>
      <div className="body">
        <h1>{name}</h1>
      </div>
    </div>
  );
};

export default Card;
