import React from "react";
import { DEFAULT_LOGO_SIZE, DEFAULT_LOGO_FILL } from "../../theme";

function Logo({ size = DEFAULT_LOGO_SIZE, fill = DEFAULT_LOGO_FILL }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102 144" height={size} width={size} fill={fill}>
      <g data-name="Layer 2">
        <g className="cls-1" data-name="Rectangle 2">
          <g data-name="Rectangle 2">
            <path d="M0 0v126a18 18 0 0018 18h6V0z" className="cls-2"></path>
            <path d="M24 0H0v126a18 18 0 0018 18h6V0z" className="cls-2"></path>
          </g>
        </g>
        <g className="cls-1" data-name="Rectangle 2">
          <g data-name="Rectangle 2">
            <path d="M96 0H102V24H96z" className="cls-2"></path>
            <path d="M102 0L96 0 96 24 102 24 102 0 102 0z" className="cls-2"></path>
          </g>
        </g>
        <g className="cls-1" data-name="Rectangle 2">
          <g data-name="Rectangle 2">
            <path d="M24 24H30V48H24z" className="cls-2"></path>
            <path d="M30 24L24 24 24 48 30 48 30 24 30 24z" className="cls-2"></path>
          </g>
        </g>
        <g className="cls-1" data-name="Rectangle 2">
          <g data-name="Rectangle 2">
            <path d="M90 0a18 18 0 00-18 18v126h6a18 18 0 0018-18V0z" className="cls-2"></path>
            <path d="M96 0h-6a18 18 0 00-18 18v126h6a18 18 0 0018-18V0z" className="cls-2"></path>
          </g>
        </g>
        <g className="cls-1" data-name="Rectangle 2">
          <g data-name="Rectangle 2">
            <path d="M96 48H102V72H96z" className="cls-2"></path>
            <path d="M102 48L96 48 96 72 102 72 102 48 102 48z" className="cls-2"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Logo;
