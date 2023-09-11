import Marquee from "react-fast-marquee";

const NowPlaying = ({ channel }: { channel: string }) => {
  return (
    channel && (
      <Marquee
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "black",
          color: "white",
        }}
      >
        <h1>{channel}</h1>
      </Marquee>
    )
  );
};

export default NowPlaying;
