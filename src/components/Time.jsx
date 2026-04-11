import React from "react";

const Time = ({ time, name }) => {
  return (
    <div>
      <div className="flex items-center justify-around text-xl  p-3 bg-[#e2ac93]/75 rounded-lg ">
        <h2>{name}</h2>
        <h3>{time}</h3>
      </div>
    </div>
  );
};

export default Time;
