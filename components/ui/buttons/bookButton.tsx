import React from "react";

/**
 * The hero's primary action. White on the near-black ground rather than red:
 * in this layout the red is reserved for the one small label above the
 * headline, so a red button would be the second accent competing with it.
 *
 * py-3 on phones too — py-2 made this 38px tall, under the 44px minimum
 * touch target.
 */
export const BookButton = ({
  title,
  showModal,
}: {
  title: string;
  showModal: () => void;
}) => {
  return (
    <button
      onClick={showModal}
      className="w-fit cursor-pointer rounded-sm bg-white px-8 py-4 text-sm font-medium text-background text-nowrap transition-colors duration-300 hover:bg-gray-200 max-md:px-6 max-md:py-3"
    >
      {title}
    </button>
  );
};
