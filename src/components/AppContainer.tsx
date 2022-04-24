/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Fragment, useEffect, useRef, useState } from "react";
import App from "./MainSection";
import Scene from "./scene/Scene";
import buttonClick from "../assets/audio/button-click.mp3";
import buttonHover from "../assets/audio/button-hover.mp3";
import playSound from "../utils/playSound";
import Footer from "./Footer";
import RepositorySection from "./RepositorySection";
import MainSection from "./MainSection";
import NavigationBars from "./NavigationBars";

function AppContainer() {
	const [muted, setMuted] = useState(true);

	const buttonClickAudioElement = useRef(null);
	const buttonHoverAudioElement = useRef(null);

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (muted) return;
			document.hidden ? setMuted(true) : setMuted(false);
		};
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	const onHeadphonesIconClick = () => {
		setMuted(!muted);
	};

	return (
		<div css={appContainerStyles}>
			<audio
				src={buttonClick}
				ref={buttonClickAudioElement}
				muted={muted}
			></audio>
			<audio
				src={buttonHover}
				ref={buttonHoverAudioElement}
				muted={muted}
			></audio>
			<Scene />
			<NavigationBars
				muted={muted}
				onHeadphonesIconClick={onHeadphonesIconClick}
				onButtonClick={() => {
					playSound(buttonClickAudioElement);
				}}
				onButtonHover={() => {
					playSound(buttonHoverAudioElement);
				}}
			/>
			<MainSection
				muted={muted}
				onHeadphonesIconClick={onHeadphonesIconClick}
				onButtonClick={() => {
					playSound(buttonClickAudioElement);
				}}
				onButtonHover={() => {
					playSound(buttonHoverAudioElement);
				}}
			/>
			<RepositorySection />
			<Footer />
		</div>
	);
}

const appContainerStyles = css`
	display: flex;
	flex-direction: column;
	gap: 200px;
`;

export default AppContainer;
