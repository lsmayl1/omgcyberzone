import React from "react";

export const BookButton = ({ title = "Забронировать" }) => {
  return (
    <button className="bg-mainRed px-4 py-2 rounded-full font-bold cursor-pointer text-white">
      {title}
    </button>
  );
};
