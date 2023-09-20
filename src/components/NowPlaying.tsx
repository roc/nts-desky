import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import type { Now } from "./Schedule";
import DecodedHtml from "./Decoded";
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
  };
  setLoading: (channel: string, loading: boolean) => void;
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  handlePlaying: (id: string, now: Now) => void;
}) => {
  const [volume, setVolume] = useState(60);
  console.log("playing", playing);
  const { now, title } = playing;

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          display: "grid",
          gridTemplateRows: "1fr",
          gridTemplateColumns: "1fr 8fr 1fr",
          gridColumnGap: "40px",
          gridRowGap: "40px",
          padding: "10px",
          backgroundColor: "black",
        }}
      >
        <audio
          ref={audioRef}
          onLoadStart={() => setLoading(title, true)}
          onCanPlayThrough={() => setLoading(title, false)}
          src={audioStream(title)}
          autoPlay={true}
          controls={false}
        />
        <PlayControl
          isLoading={playing.loading === true}
          id={playing.title}
          onPress={() => handlePlaying(title, now)}
          isPlaying={playing.loading === false}
        />
        <div style={{ display: "block", height: "100%" }}>
          <Marquee
            style={{
              backgroundColor: "black",
              color: "white",
              width: "100%",
            }}
          >
            <h1 className="scilla-narrow-italic text-3xl mt-3">
              <DecodedHtml>
                Now Playing: {now.broadcast_title} on {title}
              </DecodedHtml>
            </h1>
            <MarqueeSpacer spaces={5} />
          </Marquee>
        </div>
        <div
          className="volumeControls"
          style={{
            display: "block",
            height: "100%",
          }}
        >
          <label htmlFor="volume" style={{ color: "white" }}>
            <em>i am volume</em>
            <input
              style={{
                fontSize: "1.5rem",
              }}
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
    </>
  );
};

export default NowPlaying;
