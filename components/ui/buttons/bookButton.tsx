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
      // border-transparent so this lines up with the outlined CTA beside it,
      // which would otherwise be 2px taller.
      className="bg-mainRed w-fit text-base px-6 py-3 rounded-lg border border-transparent font-semibold cursor-pointer max-md:text-sm max-md:px-4 max-md:py-2 text-white uppercase text-nowrap transition-transform duration-300 hover:scale-105"
    >
      {title}
    </button>
  );
};
