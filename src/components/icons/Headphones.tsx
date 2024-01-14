import React from "react";
import { DEFAULT_ICON_SIZE } from "../../theme";

const HeadphonesIcon = ({ customStyles, size = DEFAULT_ICON_SIZE }: { customStyles?: string; size?: number }) => {
  return (
    <svg
      className={customStyles}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 118.28 122.88"
      width={size}
      height={size}
    >
      <path d="M111.85 108.77a28.952 28.952 0 01-14.13 10.48c-.26.12-.55.18-.84.18-.28 0-.56-.06-.82-.17v.06c0 1.96-1.6 3.56-3.57 3.56h-7.68c-1.96 0-3.57-1.6-3.57-3.56V64.19c0-1.96 1.6-3.57 3.57-3.57h7.68c1.96 0 3.57 1.6 3.57 3.57v.34c.26-.12.54-.18.82-.18.22 0 .44.04.64.1v.01c4.36 1.45 8.26 3.92 11.42 7.11V59.15c0-14.89-4.99-27.63-13.81-36.6l-3.91 5.83c-7.95-8.75-19.4-14.27-32.08-14.27-12.76 0-24.29 5.59-32.24 14.45l-4.73-5.78c-8.7 8.87-13.63 21.43-13.63 36.37V73.4c3.4-4.08 7.92-7.22 13.07-8.93v-.01c.21-.07.43-.11.64-.11.28 0 .57.06.82.17v-.34c0-1.96 1.61-3.57 3.57-3.57h7.68c1.96 0 3.57 1.6 3.57 3.57v55.13c0 1.96-1.61 3.56-3.57 3.56h-7.68c-1.96 0-3.57-1.6-3.57-3.56v-.06a2.04 2.04 0 01-1.65-.01 28.952 28.952 0 01-14.13-10.48 28.656 28.656 0 01-4.17-8.37H0V59.15C0 42.88 6.65 28.1 17.37 17.38 28.09 6.66 42.88 0 59.14 0c16.27 0 31.06 6.66 41.77 17.37 10.72 10.72 17.37 25.5 17.37 41.77v41.25h-2.27c-.91 3-2.33 5.84-4.16 8.38z"></path>
    </svg>
  );
};

export default HeadphonesIcon;
