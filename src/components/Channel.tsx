import React, { useEffect, useState } from "react";
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
  paused,
}: {
  title: string;
  now: Now;
  isPlaying: boolean;
  handlePlaying: (id: string, now: Now) => void;
  isLoading: boolean;
  paused: boolean;
}) => {
  const { broadcast_title: name } = now;
  const { embeds, end_timestamp: endTimestamp } = now;
  const { details } = embeds;
  const { description, media, location_long: locationLong } = details;

  const [timeLeft, setTimeLeft] = useState(fromnow(endTimestamp));

  // check for time remaining every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(fromnow(endTimestamp));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <FixedWidthContainer
      key={title}
      className="grid place-items-center gap-y-5 pb-20"
      containerWidth="420px"
    >
      <div className="flex flex-row w-full items-start">
        <div className="flex inline-flex h-10">
          <span className="relative h-4 w-4 mr-2 -ml-6 place-self-center">
            <span className="relative inline-block rounded-full h-4 w-4 bg-red-500">
              <span className="animate-ping absolute inline-block h-full w-full rounded-full bg-red-400 opacity-75"></span>
            </span>
          </span>
          <PlayControl
            className="place-self-center"
            isLoading={isLoading}
            id={title}
            onPress={() => handlePlaying(title, now)}
            isPlaying={isPlaying}
            paused={paused}
          />
        </div>

        <h2 className="gooper-regular text-xl">
          <span className="inline-block bg-white text-black p-1 mr-2 w-10 text-center">
            {title}
          </span>
          <DecodedHtml>{name}</DecodedHtml>
        </h2>
      </div>
      <div className="flex flex-col justify-self-start">
        <p>{locationLong ? `Broadcasting from ${locationLong}` : null}</p>
        <p>{timeLeft} left</p>
      </div>

      <img src={media.background_large} />

      <p>{description}</p>
    </FixedWidthContainer>
  );
};

export default Channel;
