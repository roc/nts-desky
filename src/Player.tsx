import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

type PlayerProps = { src: string; title: string; setPlaying: Function };

export default function Player({ src, setPlaying }: PlayerProps) {
  return (
    <AudioPlayer
      // title={title}
      className="player"
      src={src}
      onPlay={(e) => {
        setPlaying();
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
