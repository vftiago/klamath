import { MutableRefObject } from "react";

const playSound = (audioElement: MutableRefObject<HTMLAudioElement | null>) => {
  if (audioElement.current != null) {
    audioElement.current.pause();
    audioElement.current.currentTime = 0;
    audioElement.current.play();
  }
};

export default playSound;
