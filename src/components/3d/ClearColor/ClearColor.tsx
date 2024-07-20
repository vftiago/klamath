import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const ClearColor = () => {
  const state = useThree();

  useEffect(() => {
    state.gl.setClearColor(0xeeeeee, 1.1);
  }, []);

  return null;
};

export default ClearColor;
