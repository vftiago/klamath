import React from "react";
import HeadphonesIcon from "./Headphones";
import clsx from "clsx";

const AnimatedHeadphonesIcon = ({ active }: { active: boolean }) => {
  return (
    <div className="flex items-center justify-center transition duration-500 ease-out-expo">
      <div className="relative flex items-center justify-center [&>span]:hover:bg-orange-600 [&>svg]:hover:fill-orange-600">
        <HeadphonesIcon customStyles="fill-neutral-800 transition duration-500 ease-out-expo" />
        <span
          className={clsx(
            `absolute left-1/2 top-0 -ml-3 mt-2 h-[2px] w-6 -rotate-45 scale-x-0 bg-black transition duration-500 ease-out-expo`,
            active ? "" : "scale-x-100",
          )}
        ></span>
      </div>
    </div>
  );
};

export default AnimatedHeadphonesIcon;
