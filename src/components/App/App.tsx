import React from "react";
import { useBreakpoints } from "../../useBreakpoints";
import LightApp from "./LightApp";
import MainApp from "./MainApp";

const App = () => {
	const { isMdScreen } = useBreakpoints();

	return isMdScreen ? <MainApp /> : <LightApp />;
};

export default App;
