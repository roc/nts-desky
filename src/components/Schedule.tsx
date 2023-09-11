import React, { useEffect, useState } from "react";
import axios from "axios";
import NowPlaying from "./NowPlaying";
import Channel from "./Channel";

interface ServerData {
  foo: string;
  bar: number;
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

const Schedule: React.FC = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [playing, setPlaying] = useState(null);

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
          console.log("got response from server", response);
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
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handlePlaying = (title: string, now: Now) => {
    if (playing && playing.title === title) {
      // toggle player stop
      return setPlaying(null);
    }
    return setPlaying({ title, now });
  };

  return (
    <>
      <ul>
        {items.map((channel: any) => {
          console.log("actual channel info", channel);
          const { channel_name: channelTitle } = channel;
          return (
            <Channel
              title={channelTitle}
              now={channel.now}
              key={channelTitle}
              handlePlaying={handlePlaying}
              isPlaying={playing && playing.title === channelTitle}
            />
          );
        })}
      </ul>
      {playing && <NowPlaying channel={playing.title} details={playing.now} />}
    </>
  );
};

export default Schedule;
