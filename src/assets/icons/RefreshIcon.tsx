import React from "react";
import { twMerge } from "tailwind-merge";

const RefreshIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      className={twMerge("w-16 h-16", className)}
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_31085_5556)">
        <path
          d="M10 28C10 15.8497 19.8497 6 32 6C44.1503 6 54 15.8497 54 28C54 40.1503 44.1503 50 32 50C19.8497 50 10 40.1503 10 28Z"
          fill="#4C4C4C"
        />
        <path
          d="M32 36C29.7667 36 27.875 35.225 26.325 33.675C24.775 32.125 24 30.2333 24 28C24 25.7667 24.775 23.875 26.325 22.325C27.875 20.775 29.7667 20 32 20C33.15 20 34.25 20.2375 35.3 20.7125C36.35 21.1875 37.25 21.8667 38 22.75V21C38 20.7167 38.0958 20.4792 38.2875 20.2875C38.4792 20.0958 38.7167 20 39 20C39.2833 20 39.5208 20.0958 39.7125 20.2875C39.9042 20.4792 40 20.7167 40 21V26C40 26.2833 39.9042 26.5208 39.7125 26.7125C39.5208 26.9042 39.2833 27 39 27H34C33.7167 27 33.4792 26.9042 33.2875 26.7125C33.0958 26.5208 33 26.2833 33 26C33 25.7167 33.0958 25.4792 33.2875 25.2875C33.4792 25.0958 33.7167 25 34 25H37.2C36.6667 24.0667 35.9375 23.3333 35.0125 22.8C34.0875 22.2667 33.0833 22 32 22C30.3333 22 28.9167 22.5833 27.75 23.75C26.5833 24.9167 26 26.3333 26 28C26 29.6667 26.5833 31.0833 27.75 32.25C28.9167 33.4167 30.3333 34 32 34C33.1333 34 34.1708 33.7125 35.1125 33.1375C36.0542 32.5625 36.7833 31.7917 37.3 30.825C37.4333 30.5917 37.6208 30.4292 37.8625 30.3375C38.1042 30.2458 38.35 30.2417 38.6 30.325C38.8667 30.4083 39.0583 30.5833 39.175 30.85C39.2917 31.1167 39.2833 31.3667 39.15 31.6C38.4667 32.9333 37.4917 34 36.225 34.8C34.9583 35.6 33.55 36 32 36Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_31085_5556"
          x="0"
          y="0"
          width="64"
          height="64"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_31085_5556"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_31085_5556"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

RefreshIcon.displayName = "RefreshIcon";

export default RefreshIcon;
