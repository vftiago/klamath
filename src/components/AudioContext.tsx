import { createContext } from "react";

export const AudioContext = createContext<{
  isMuted: boolean;
  buttonClickAudioElementRef: React.MutableRefObject<HTMLAudioElement | null>;
  buttonHoverAudioElementRef: React.MutableRefObject<HTMLAudioElement | null>;
}>({
  isMuted: true,
  buttonClickAudioElementRef: { current: null },
  buttonHoverAudioElementRef: { current: null },
});
