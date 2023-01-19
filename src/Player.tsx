import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

type PlayerProps = { src: string };

export default function Player({ src }: PlayerProps) {
  return (
    <AudioPlayer
      className="player"
      src={src}
      //   autoPlay
      onPlay={(e) => console.log(e, "onPlay")}
      showJumpControls={false}
      customAdditionalControls={[]}
      showDownloadProgress={false}
      showFilledProgress={false}
      //   showJumpControls={false}
      //   layout="stacked"
      customProgressBarSection={[]}
      customControlsSection={["MAIN_CONTROLS"]}
      //   autoPlayAfterSrcChange={false}
    />
  );
}
