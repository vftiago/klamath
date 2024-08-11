import React from "react";
import HeadphonesIcon from "./Headphones";
import clsx from "clsx";

const AnimatedHeadphonesIcon = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="flex items-center justify-center transition duration-500 ease-out-expo">
      <div className="relative flex items-center justify-center [&>span]:hover:bg-orange-600 [&>svg]:hover:fill-orange-600">
        <HeadphonesIcon customStyles="fill-neutral-800 transition duration-500 ease-out-expo" />
        <span
          className={clsx(
            `absolute left-1/2 top-2 -ml-3 h-0.5 w-6 -rotate-45 scale-x-0 bg-black transition duration-500 ease-out-expo`,
            {
              "scale-x-100": isActive,
            },
          )}
        ></span>
      </div>
    </div>
  );
};

export default AnimatedHeadphonesIcon;
