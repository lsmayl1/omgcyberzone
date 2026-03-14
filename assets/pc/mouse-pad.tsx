import * as React from "react";

const MousePad = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={30} height={27} viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_123_622)">
    <rect x={0.5} y={0.5} width={29} height={25.087} rx={4.5} fill="#1A1F25" stroke="#E93737"/>
    </g>
    <defs>
    <clipPath>
    <rect width={30} height={26.087} fill="white"/>
    </clipPath>
    </defs>
    </svg>
  );
};

export default MousePad;
