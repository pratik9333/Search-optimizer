import React from "react";

import "./styles.modules.css";

const Card = ({ name, image, rdata }) => {
  return (
    <div>
    <div className='card'>
    <div className='card-inner'>
      <div className='card-front'>
        <img src={image} alt='' />
      </div>
      <div className='card-back'>
        <h1>{name}</h1>
        <ul>
          <li>
            <strong>Actor Name:</strong> {rdata.portrayed}
          </li>
          <li>
            <strong>Nickname:</strong> {rdata.nickname}
          </li>
          <li>
            <strong>Birthday:</strong> {rdata.birthday}
          </li>
          <li>
            <strong>Status:</strong> {rdata.status}
          </li>
        </ul>
      </div>
    </div>
  </div>   
    </div>
  );
};

export default Card;
