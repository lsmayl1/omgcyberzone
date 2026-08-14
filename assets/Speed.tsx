import * as React from "react";

const Speed = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 12C6.5 8.5 23.5 8.5 27 12"
        stroke="#E93737"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 16.5C10 14 20 14 22.5 16.5"
        stroke="#E93737"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 21C13.5 19.5 16.5 19.5 18 21"
        stroke="#E93737"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 25.25H15.01"
        stroke="#E93737"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Speed;
