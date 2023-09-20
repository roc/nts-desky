import React from "react";
import PlayControl from "./PlayControl";
import type { Now } from "./App";
import DecodedHtml from "./Decoded";
import FixedWidthContainer from "./FixedWidthContainer";
PlayControl;

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
  const { broadcast_title: name } = now;
  const { embeds } = now;
  const { details } = embeds;
  const { description, media, location_long: locationLong } = details;

  return (
    <FixedWidthContainer
      key={title}
      className="grid place-items-center gap-y-5 pb-20"
      containerWidth="420px"
    >
      <h2 className="gooper-regular text-xl">
        <DecodedHtml>
          {title}: {name} {locationLong ? `(${locationLong})` : null}
        </DecodedHtml>
      </h2>
      <img src={media.background_medium} />
      <PlayControl
        isLoading={isLoading}
        id={title}
        onPress={() => handlePlaying(title, now)}
        isPlaying={isPlaying}
      />
      <p>{description}</p>
    </FixedWidthContainer>
  );
};

export default Channel;
