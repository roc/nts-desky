import React, { useEffect, useState } from "react";
import axios from "axios";
import NowPlaying from "./NowPlaying";
import Channel from "./Channel";

interface ServerData {
  foo: string;
  bar: number;
  results: [];
}

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
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handlePlaying = (title: string) => {
    console.log(title, "title");
    setPlaying(title);
  };

  return (
    <>
      <ul>
        {items.map((channel: any) => {
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
      <NowPlaying channel={playing && playing.title} />
    </>
  );
};

export default Schedule;
