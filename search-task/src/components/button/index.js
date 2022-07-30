import React from "react";

import "./styles.modules.css";

const Button = ({ text, disabled, onClick }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
