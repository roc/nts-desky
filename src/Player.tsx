import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

type PlayerProps = { src: string };

export default function Player({ src }: PlayerProps) {
  return (
    <AudioPlayer
      className="player"
      src={src}
      onPlay={(e) => {
        console.log(e, "onPlay");
        console.log(typeof e.target);
        console.log(e.target);
      }}
      showJumpControls={false}
      showDownloadProgress={false}
      showFilledProgress={false}
      customProgressBarSection={[]}
      customControlsSection={[RHAP_UI.MAIN_CONTROLS, RHAP_UI.VOLUME_CONTROLS]}
    />
  );
}
