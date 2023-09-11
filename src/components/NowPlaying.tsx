import Marquee from "react-fast-marquee";
import type { Now } from "./Schedule";

const audioStream = (channel: string) =>
  `https://stream-relay-geo.ntslive.net/stream${
    channel === "2" ? 2 : ""
  }?client=NTSWebApp`;

const NowPlaying = ({
  channel,
  details,
  setLoading,
}: {
  channel: string;
  details: Now;
  setLoading: (channel: string, loading: boolean) => void;
}) => {
  return (
    channel && (
      <>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
          }}
        >
          <Marquee
            style={{
              backgroundColor: "black",
              color: "white",
            }}
          >
            <h1>
              Now Playing: {details.broadcast_title} on channel {channel}
            </h1>
          </Marquee>
          <audio
            onLoadStart={() => setLoading(channel, true)}
            onCanPlayThrough={() => setLoading(channel, false)}
            src={audioStream(channel)}
            autoPlay={true}
            controls={false}
          ></audio>
        </div>
      </>
    )
  );
};

export default NowPlaying;
