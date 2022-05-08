/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useThree } from "@react-three/fiber";
import { Fragment } from "react";

const ClearColor = () => {
	const state = useThree();

	state.gl.setClearColor(0xeeeeee, 1.0);

	return <Fragment></Fragment>;
};

export default ClearColor;
