import React from 'react';

const BrandLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* SVG Icon part */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M8 4V28"
          stroke="url(#paint0_linear)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M8 4H18C22.4183 4 26 7.58172 26 12C26 16.4183 22.4183 20 18 20H8"
          stroke="url(#paint1_linear)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 12H16"
          stroke="#008C9E"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="8"
            y1="4"
            x2="8"
            y2="28"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#008C9E" />
            <stop offset="1" stopColor="#003B73" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="8"
            y1="4"
            x2="26"
            y2="12"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#008C9E" />
            <stop offset="1" stopColor="#003B73" />
          </linearGradient>
        </defs>
      </svg>
      {/* Text part */}
      <span className="text-xl font-extrabold tracking-tighter text-navy-dark flex">
        PATH<span className="text-navy">PALZ</span>
      </span>
    </div>
  );
};

export default BrandLogo;
