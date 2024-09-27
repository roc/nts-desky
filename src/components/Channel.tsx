import React from "react";
import PlayControl from "./PlayControl";
import type { Now } from "./Schedule";
import DecodedHtml from "./DecodedHtml";
import FixedWidthContainer from "./FixedWidthContainer";
PlayControl;
import fromnow from "fromnow";

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
  const { embeds, end_timestamp: endTimestamp } = now;
  const { details } = embeds;
  const { description, media, location_long: locationLong } = details;

  return (
    <FixedWidthContainer
      key={title}
      className="grid place-items-center gap-y-5 pb-20"
      containerWidth="420px"
    >
      <h2 className="gooper-regular text-xl">
        <span className="p-4 bg-white rounded-full text-black">{title}: </span>
        <DecodedHtml>
          {name} {locationLong ? `(${locationLong})` : null}
        </DecodedHtml>
      </h2>
      <h3>{fromnow(endTimestamp)} left</h3>
      <img src={media.background_large} />
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
