import * as React from "react";

const Area = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M3 3H27V27H3V3Z"
        stroke="#E93737"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 19.5L19.5 10.5"
        stroke="#E93737"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 10.5H19.5V15.5"
        stroke="#E93737"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 19.5H10.5V14.5"
        stroke="#E93737"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Area;
