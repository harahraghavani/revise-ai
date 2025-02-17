import React from "react";

export const Logo = ({ colorMode, isLoading }) => {
  return (
    <svg
      width="35px"
      height="35px"
      viewBox="-3.2 -3.2 38.40 38.40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            stopColor={colorMode === "dark" ? "#ffffff" : "#000000"}
          >
            {isLoading && (
              <animate
                attributeName="offset"
                values="0;1;0"
                dur="2s"
                repeatCount="indefinite"
              />
            )}
          </stop>
          <stop
            offset="100%"
            stopColor={colorMode === "dark" ? "#cccccc" : "#666666"}
          >
            {isLoading && (
              <animate
                attributeName="offset"
                values="0;1;0"
                dur="2s"
                repeatCount="indefinite"
              />
            )}
          </stop>
        </linearGradient>
      </defs>
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="0.64"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          d="M 15.505859 2.4394531 L 3 24 L 5.3125 24 L 15.509766 6.4199219 L 25.628906 23.798828 L 29.574219 17 L 27.261719 17 L 25.625 19.820312 L 15.505859 2.4394531 z M 15.525391 10.429688 L 8.8144531 22 L 11.128906 22 L 15.529297 14.410156 L 24.027344 29 L 26.341797 29 L 15.525391 10.429688 z"
          fill={
            isLoading
              ? "url(#gradient)"
              : colorMode === "dark"
              ? "#ffffff"
              : "#000000"
          }
        />
      </g>
    </svg>
  );
};
