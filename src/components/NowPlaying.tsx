import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import type { Now } from "./Schedule";
import DecodedHtml from "./DecodedHtml";
import PlayControl from "./PlayControl";

const audioStream = (channel: string) =>
  `https://stream-relay-geo.ntslive.net/stream${
    channel === "2" ? 2 : ""
  }?client=NTSWebApp`;

// https://github.com/justin-chu/react-fast-marquee/issues/58
// hack to get some space in the marquee
const MarqueeSpacer = ({ spaces }: { spaces: number }) => {
  return (
    <pre>
      {[...Array(spaces)].map(() => {
        return " ";
      })}
    </pre>
  );
};

const NowPlaying = ({
  playing,
  setLoading,
  audioRef,
  handlePlaying,
}: {
  playing: {
    title: string;
    now: Now;
    loading: boolean;
    paused: boolean;
  };
  setLoading: (channel: string, loading: boolean) => void;
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  handlePlaying: (id: string, now: Now) => void;
}) => {
  console.log("playing in nowplaying", playing);
  const [volume, setVolume] = useState(80);
  const { now, title } = playing;

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  return (
    <div className="fixed flex flex-row bottom-0 w-full bg-black p-2 px-2 gap-x-2">
      <audio
        ref={audioRef}
        onLoadStart={() => setLoading(title, true)}
        onCanPlayThrough={() => setLoading(title, false)}
        src={audioStream(title)}
        autoPlay={true}
        controls={false}
        muted={playing.paused}
      />
      <PlayControl
        className="place-self-center"
        isLoading={playing.loading === true}
        id={playing.title}
        onPress={() => handlePlaying(playing.title, playing.now)}
        isPlaying={playing.loading === false}
        paused={playing.paused}
      />

      <Marquee className="w-full">
        <h1 className="scilla-narrow-italic text-3xl">
          <DecodedHtml>
            Now Playing: {now.broadcast_title} on {title}
          </DecodedHtml>
        </h1>
        <MarqueeSpacer spaces={5} />
      </Marquee>

      <div className="w-20 text-center">
        <label htmlFor="volume">
          <em>volume</em>
          <input
            className="w-20"
            name="volume"
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default NowPlaying;
