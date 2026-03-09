import * as React from "react";

const Sun = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_73_422)">
    <path d="M8.30187 12.6325C8.04015 13.373 7.89774 14.1699 7.89774 15C7.89774 18.9224 11.0775 22.1023 15 22.1023C18.9225 22.1023 22.1023 18.9224 22.1023 15C22.1023 11.0775 18.9225 7.89771 15 7.89771C14.1699 7.89771 13.373 8.04012 12.6325 8.30184" stroke="#FF9E0B" strokeWidth={2} strokeLinecap="round"/>
    <path d="M15 0.795471V3.63638" stroke="#FF9E0B" strokeWidth={2} strokeLinecap="round"/>
    <path d="M15 26.3636V29.2046" stroke="#FF9E0B" strokeWidth={2} strokeLinecap="round"/>
    <path d="M3.63635 15H0.795441" stroke="#FF9E0B" strokeWidth={2} strokeLinecap="round"/>
    <path d="M29.2046 15H26.3636" stroke="#FF9E0B" strokeWidth={2} strokeLinecap="round"/>
    <path d="M26.048 3.95264L22.8918 6.8384" stroke="#FF9E0B" strokeWidth={2} strokeLinecap="round"/>
    <path d="M3.95193 3.95264L7.1082 6.8384" stroke="#FF9E0B" strokeWidth={2} strokeLinecap="round"/>
    <path d="M7.10845 22.8916L3.95187 26.0481" stroke="#FF9E0B" strokeWidth={2} strokeLinecap="round"/>
    <path d="M26.048 26.0473L22.8918 22.8907" stroke="#FF9E0B" strokeWidth={2} strokeLinecap="round"/>
    </g>
    <defs>
    <clipPath>
    <rect width={30} height={30} fill="white"/>
    </clipPath>
    </defs>
    </svg>
  );
};

export default Sun;
