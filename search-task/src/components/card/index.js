import React from "react";

import "./styles.modules.css";

const Card = ({ character }) => {
  return (
    <div>
    <div className='card'>
    <div className='card-inner'>
      <div className='card-front'>
        <img src={character.img} alt='' />
      </div>
      <div className='card-back'>
        <h1>{character.name}</h1>
        <ul>
          <li>
            <strong>Actor Name:</strong> {character.portrayed}
          </li>
          <li>
            <strong>Nickname:</strong> {character.nickname}
          </li>
          <li>
            <strong>Birthday:</strong> {character.birthday}
          </li>
          <li>
            <strong>Status:</strong> {character.status}
          </li>
        </ul>
      </div>
    </div>
  </div>   
    </div>
  );
};

export default Card;
