import { MutableRefObject } from "react";

const playSound = async (
	audioElement: MutableRefObject<HTMLAudioElement | null>,
) => {
	if (audioElement.current != null) {
		audioElement.current.pause();
		audioElement.current.currentTime = 0;
		try {
			await audioElement.current.play();
		} catch (e) {
			console.error(e);
		}
	}
};

export default playSound;
