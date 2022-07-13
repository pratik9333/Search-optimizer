import React from "react";

import "./styles.modules.css";

const Button = (props) => {
  return (
    <button
      onClick={() => {
        props.setPaginate(
          props.name === "Back" ? props.paginate - 5 : props.paginate + 5
        );
      }}
      disabled={
        (props.name === "Back" && props.paginate === 1) ||
        (props.name !== "Back" && props.Data && props.Data.length < 5)
      }
    >
      {props.name}
    </button>
  );
};

export default Button;
