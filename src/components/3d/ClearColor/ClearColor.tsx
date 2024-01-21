import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useInitialWindowSize } from "../useInitialWindowSize";

const ClearColor = () => {
  const state = useThree();

  const { haveBothDimensionsChanged } = useInitialWindowSize();

  const handleWindowResize = () => {
    if (!haveBothDimensionsChanged()) return;

    state.gl.setPixelRatio(window.devicePixelRatio);
    state.gl.setSize(window.innerWidth, window.innerHeight);
  };

  useEffect(() => {
    state.gl.setClearColor(0xeeeeee, 1.1);

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return null;
};

export default ClearColor;
