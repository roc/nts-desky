import React from "react";
import PlayControl from "./PlayControl";
import type { Now } from "./Schedule";
PlayControl;

const renderHTML = (rawHTML: string) =>
  React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

const Channel = ({
  title,
  now,
  isPlaying,
  handlePlaying,
  isLoading,
}: {
  title: string;
  now: Now;
  isPlaying: boolean;
  handlePlaying: (id: string, now: Now) => void;
  isLoading: boolean;
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
        isLoading={isLoading}
        id={title}
        onPress={() => handlePlaying(title, now)}
        isPlaying={isPlaying}
      />
      <p>{description}</p>
    </div>
  );
};

export default Channel;
