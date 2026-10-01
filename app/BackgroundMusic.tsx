"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, []);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/event-song.mp3" autoPlay loop preload="auto" />
      <button
        className="music-button"
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        aria-pressed={isPlaying}
      >
        <span className="music-icon" aria-hidden="true">{isPlaying ? "♫" : "♪"}</span>
        <span>{isPlaying ? "Music on" : "Play music"}</span>
      </button>
    </>
  );
}
