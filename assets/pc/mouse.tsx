import * as React from "react";

const Mouse = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={30} height={42} viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1.85397 15.3556C1.85397 7.98786 7.73966 2.01514 15 2.01514C22.2604 2.01514 28.146 7.98786 28.146 15.3556V26.7902C28.146 34.158 22.2604 40.1307 15 40.1307C7.73966 40.1307 1.85397 34.158 1.85397 26.7902V15.3556Z" stroke="#E93737" strokeWidth={2}/>
    <path d="M12.183 14.4027C12.183 12.8239 13.4443 11.5441 15 11.5441C16.5557 11.5441 17.817 12.8239 17.817 14.4027V18.2143C17.817 19.793 16.5557 21.0729 15 21.0729C13.4443 21.0729 12.183 19.793 12.183 18.2143V14.4027Z" stroke="#E93737" strokeWidth={2}/>
    <path opacity={0.5} d="M15 2.01514V11.544" stroke="#E93737" strokeWidth={2} strokeLinecap="round"/>
    </svg>
  );
};

export default Mouse;
