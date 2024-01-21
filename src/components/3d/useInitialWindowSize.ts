import { useEffect, useRef } from "react";

export const useInitialWindowSize = () => {
  const initialWindowHeight = useRef(window.innerHeight);
  const initialWindowWidth = useRef(window.innerWidth);

  const hasHeightChanged = () => {
    return window.innerHeight !== initialWindowHeight.current;
  };

  const hasWidthChanged = () => {
    return window.innerWidth !== initialWindowWidth.current;
  };

  const haveBothDimensionsChanged = () => {
    return hasHeightChanged() && hasWidthChanged();
  };

  useEffect(() => {
    if (haveBothDimensionsChanged()) {
      initialWindowHeight.current = window.innerHeight;
      initialWindowWidth.current = window.innerWidth;
    }
  }, [window.innerHeight, window.innerWidth]);

  return {
    hasHeightChanged,
    hasWidthChanged,
    haveBothDimensionsChanged,
  };
};
