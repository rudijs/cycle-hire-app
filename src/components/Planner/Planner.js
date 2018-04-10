import React from "react";

const planner = () => {
  return (
    <div>
      <h3>Journey Planner</h3>
      <p>Specify a start and end location for your journey.</p>
      <label htmlFor="from">From Bicycle Docking Station</label>
      <input
        className="u-full-width"
        type="text"
        placeholder="From..."
        id="from"
      />
      <label htmlFor="to">To Bicycle Docking Station</label>
      <input
        className="u-full-width"
        type="text"
        placeholder="Tap to specify the end..."
        id="to"
      />
      <br />
      <br />
      <button type="button">Plan my journey</button>
    </div>
  );
};

export default planner;
