import React from "react";
import { RiLoader2Line } from "../assets/assets";

const Loader = ({ text }) => {
  return (
    <div className="flex items-center justify-center h-full">
      {text}
      <RiLoader2Line className="w-5 h-5 animate-spin ml-2" />
    </div>
  );
};

export default Loader;
