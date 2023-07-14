import React, { useEffect, useState } from "react";
import Player from "./Player";
import axios from "axios";

interface ServerData {
  foo: string;
  bar: number;
  results: [];
}

type ChannelProps = {
  title: string;
  now: {
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
  [x: string]: any; // mop up for ...props
};

const Channel = ({ title, now }: ChannelProps) => {
  console.log(title, now, typeof title);
  const { broadcast_title: name } = now;
  const { embeds } = now;
  const { details } = embeds;
  const { description, media, location_long: locationLong } = details;
  return (
    <div key={title}>
      <h1>
        {title}: {renderHTML(name)} {locationLong ? `(${locationLong})` : null}
      </h1>
      <img src={media.background_medium} />
      <Player
        src={`https://stream-relay-geo.ntslive.net/stream${
          title === "2" ? 2 : ""
        }?client=NTSWebApp`}
      />
      <p>{description}</p>
    </div>
  );
};

const renderHTML = (rawHTML: string) =>
  React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

const Schedule: React.FC = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    axios
      .request<ServerData>({
        url: `https://www.nts.live/api/v2/live`,
      })
      .then(
        (response) => {
          console.log(response);
          // `response` is of type `AxiosResponse<ServerData>`
          const { data } = response; // `data` is of type ServerData, correctly inferred

          setIsLoaded(true);
          setItems(data.results);
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
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map((channel: any) => {
          const { channel_name: channelTitle } = channel;
          return (
            <Channel
              title={channelTitle}
              now={channel.now}
              key={channelTitle}
            />
          );
        })}
      </ul>
    );
  }
};

export default Schedule;
