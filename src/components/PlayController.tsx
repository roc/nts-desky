import React, { useState, useEffect } from "react";
import { FiPlay, FiPause, FiLoader } from "react-icons/fi";

const PlayControl = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Simulating loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      {isLoading ? (
        <FiLoader className="loading-icon" />
      ) : (
        <button onClick={handlePlayPause} className="play-pause-button">
          {isPlaying ? (
            <FiPause className="play-icon" />
          ) : (
            <FiPlay className="play-icon" />
          )}
        </button>
      )}
    </div>
  );
};

export default PlayControl;
