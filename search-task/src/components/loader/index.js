import React from "react";

import "./styles.modules.css";

import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader">
      <TailSpin
        height="100"
        width="100"
        className="loader"
        color="#1f7ae0"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Loader;
