import React from "react";

const DividerWithText = ({ text }) => {
  return (
    <div className="relative flex items-center my-4">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-gray-500 text-sm font-medium my-2">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default DividerWithText;
