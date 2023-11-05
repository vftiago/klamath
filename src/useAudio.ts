import { useRef, useState } from "react";

export const useAudio = () => {
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const buttonClickAudioElementRef = useRef(null);
  const buttonHoverAudioElementRef = useRef(null);

  const toggleMuted = () =>
    setIsMuted((prev) => {
      return !prev;
    });

  return { isMuted, toggleMuted, buttonClickAudioElementRef, buttonHoverAudioElementRef };
};
