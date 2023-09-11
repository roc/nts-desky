import React from "react";
import PlayControl from "./PlayControl";
PlayControl;

export type Now = {
  broadcast_title: string;
  // TODO: embed/details Interface
  embeds: {
    details: {
      status: string;
      description: string;
      location_long: string;
      moods: [];
      genres: [];
      [x: string]: any; // TODO: remove when we've decided what to use
    };
  };
};

const renderHTML = (rawHTML: string) =>
  React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

const Channel = ({
  title,
  now,
  isPlaying,
  handlePlaying,
}: {
  title: string;
  now: Now;
  isPlaying: boolean;
  handlePlaying: (id: string) => void;
}) => {
  console.log(title, now, typeof title);
  const { broadcast_title: name } = now;
  const { embeds } = now;
  const { details } = embeds;
  const { description, media, location_long: locationLong } = details;
  console.log("i am handlePlaying", handlePlaying);
  return (
    <div key={title}>
      <h1>
        {title}: {renderHTML(name)} {locationLong ? `(${locationLong})` : null}
      </h1>
      <img src={media.background_medium} />
      <PlayControl
        id={title}
        onPress={() => handlePlaying(title)}
        isPlaying={isPlaying}
      />
      {/* <Player
        setPlaying={setPlaying}
        title={name}
        src={`https://stream-relay-geo.ntslive.net/stream${
          title === "2" ? 2 : ""
        }?client=NTSWebApp`}
      /> */}
      <p>{description}</p>
    </div>
  );
};

export default Channel;
