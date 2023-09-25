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
      <audio
        ref={audioRef}
        onLoadStart={() => setLoading(title, true)}
        onCanPlayThrough={() => setLoading(title, false)}
        src={audioStream(title)}
        autoPlay={true}
        controls={false}
      />
      <div
        className="fixed grid justify-items-stretch bottom-0 bg-black grid-cols-3 w-full gap-5 p-5"
        style={{
          gridTemplateColumns: "80px auto 1fr",
        }}
      >
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
