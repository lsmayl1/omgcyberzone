import React from "react";

export const BookButton = ({ title = "Забронировать", showModal }) => {
  return (
    <button
      onClick={showModal}
      className="bg-mainRed px-4 py-2 rounded-full font-bold cursor-pointer max-md:text-sm max-md:px-2 max-md:py-1 text-white"
    >
      {title}
    </button>
  );
};
