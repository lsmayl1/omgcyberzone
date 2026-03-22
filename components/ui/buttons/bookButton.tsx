import React from "react";

export const BookButton = ({
  title = "Забронировать",
  showModal,
}: {
  title: string;
  showModal: () => void;
}) => {
  return (
    <button
      onClick={showModal}
      className="bg-mainRed w-fit text-lg   px-8 py-4 rounded-xl font-semibold cursor-pointer max-md:text-sm max-md:px-4 max-md:py-1 text-white uppercase text-nowrap max-md:rounded-sm transition-transform duration-300 hover:scale-105"
    >
      {title}
    </button>
  );
};
