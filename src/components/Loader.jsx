import React from 'react';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-sphere"></div>
        <div className="loader-sphere"></div>
        <div className="loader-sphere"></div>
      </div>
      <p className="loader-text">Loading 3D Experience...</p>
    </div>
  );
};

export default Loader;