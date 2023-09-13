import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import type { Now } from "./Schedule";
import DecodedHtml from "./Decoded";

useState;
const audioStream = (channel: string) =>
  `https://stream-relay-geo.ntslive.net/stream${
    channel === "2" ? 2 : ""
  }?client=NTSWebApp`;

const NowPlaying = ({
  channel,
  details,
  setLoading,
  audioRef,
}: {
  channel: string;
  details: Now;
  setLoading: (channel: string, loading: boolean) => void;
  audioRef: React.MutableRefObject<HTMLAudioElement>;
}) => {
  const [volume, setVolume] = useState(60);

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  return (
    channel && (
      <>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            display: "grid",
            gridTemplateRows: "1fr",
            gridTemplateColumns: "1fr 8fr",
            gridColumnGap: "40px",
            gridRowGap: "40px",
            padding: "10px",
            backgroundColor: "black",
          }}
        >
          <div style={{ display: "block", height: "100%" }}>
            <label htmlFor="volume" style={{ color: "white" }}>
              <em>volume</em>
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

            <audio
              ref={audioRef}
              onLoadStart={() => setLoading(channel, true)}
              onCanPlayThrough={() => setLoading(channel, false)}
              src={audioStream(channel)}
              autoPlay={true}
              controls={false}
            />
          </div>
          <div style={{ display: "block", height: "100%" }}>
            <Marquee
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            >
              <h1 className="scillanarrow_italic" style={{ fontSize: "2em" }}>
                <DecodedHtml>
                  Now Playing: {details.broadcast_title} on {channel}
                  {""}
                </DecodedHtml>
              </h1>
            </Marquee>
          </div>
        </div>
      </>
    )
  );
};

export default NowPlaying;
