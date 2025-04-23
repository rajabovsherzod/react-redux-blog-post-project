import React from 'react';
import './loader.css';

const Loader = () => {
  return (
    <div className="square-loader">
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
    </div>
  );
};

export default Loader;