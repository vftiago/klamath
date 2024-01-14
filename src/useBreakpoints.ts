import { useEffect, useState } from "react";

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 1024,
};

export const useBreakpoints = () => {
  const [screenState, setScreenState] = useState<{
    isXsHeight: boolean;
    isSmScreen: boolean;
    isMdScreen: boolean;
    isLgScreen: boolean;
  }>({
    isXsHeight: window.innerHeight <= breakpoints.sm,
    isSmScreen: window.innerWidth <= breakpoints.md,
    isMdScreen: window.innerWidth >= breakpoints.md,
    isLgScreen: window.innerWidth >= breakpoints.lg,
  });

  const handleResize = () => {
    const newScreenState = {
      isXsHeight: window.innerHeight <= breakpoints.sm,
      isSmScreen: window.innerWidth <= breakpoints.md,
      isMdScreen: window.innerWidth >= breakpoints.md,
      isLgScreen: window.innerWidth >= breakpoints.lg,
    };

    setScreenState(newScreenState);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { ...screenState };
};
