import React, { useState, useRef } from "react";
import axios from "axios";
import NowPlaying from "./NowPlaying";
import Channel from "./Channel";
import FixedWidthContainer from "./FixedWidthContainer";
import TitleHeading from "./TitleHeading";
import { usePollingEffect } from "../hooks/usePollingEffect";

interface ServerData {
  results: [];
}

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

const Notice = ({
  classNames,
  children,
}: {
  classNames: string;
  children: React.ReactNode;
}) => (
  <div className={`${classNames} grid h-screen place-items-center`}>
    {children}
  </div>
);

const Schedule: React.FC = () => {
  const audioRef = useRef();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [channels, setChannels] = useState([]);
  const [playing, setPlaying] = useState(null);

  usePollingEffect({
    asyncCallback: async () => {
      // Only poll if the app is visible when it's loaded
      // if we haven't loaded channels once (aka initial load), still poll!
      if (isLoaded && document.visibilityState !== "visible") {
        return;
      }
      axios
        .request<ServerData>({
          // cache-bust using current time
          url: `https://www.nts.live/api/v2/live?t=${new Date().getTime()}`,
        })
        .then(
          (response) => {
            console.log("got response from server", response);
            // `response` is of type `AxiosResponse<ServerData>`
            const { data } = response; // `data` is of type ServerData, correctly inferred

            setIsLoaded(true);
            setChannels(data.results);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
            console.log(error);
          }
        );
    },
    // leaving dependencies empty seeing as we're only interested in the two channels for now and not browsing etc
    interval: 60000, // check every 60 seconds
  });

  if (error) {
    return (
      <Notice classNames={"text-4xl"}>
        Error: {error.message}
        <br />
        <br />
        (try hitting ⌘ + R)
      </Notice>
    );
  }
  if (!isLoaded) {
    return (
      <Notice classNames={"scilla-regular-italic text-6xl font-extrabold mb-6"}>
        Loading...
      </Notice>
    );
  }

  const handlePlaying = (title: string, now: Now) => {
    if (playing && playing.title === title) {
      // toggle player stop
      return setPlaying(null);
    }
    return setPlaying({ title, now, loading: true });
  };

  const setLoading = (title: string, loading: boolean) => {
    if (playing && playing.title === title) {
      return setPlaying({ ...playing, loading });
    }
  };

  const ChannelList = ({ channels }: { channels: any }) => {
    return channels.map((channel: { now: Now; channel_name: string }) => {
      const { channel_name: channelTitle } = channel;
      return (
        <Channel
          title={channelTitle}
          now={channel.now}
          key={channelTitle}
          handlePlaying={handlePlaying}
          isLoading={
            playing &&
            playing.loading === true &&
            playing.title === channelTitle
          }
          isPlaying={playing && playing.title === channelTitle}
        />
      );
    });
  };

  return (
    <>
      <FixedWidthContainer
        containerWidth="100%"
        className="grid place-items-center container mx-auto pt-10"
      >
        <TitleHeading version="0.0.2" />
        <ChannelList channels={channels} />
      </FixedWidthContainer>
      {playing && (
        <>
          <NowPlaying
            setLoading={setLoading}
            playing={playing}
            audioRef={audioRef}
            handlePlaying={handlePlaying}
          />
        </>
      )}
    </>
  );
};

export default Schedule;
