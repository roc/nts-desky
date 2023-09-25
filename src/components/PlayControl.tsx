const PlayControl = ({
  id,
  isPlaying = false,
  onPress,
  isLoading,
}: {
  id: string;
  isPlaying: boolean;
  onPress: () => void;
  isLoading: boolean;
}) => {
  return (
    <button
      id={id}
      onClick={onPress}
      className="grid place-items-center grid-cols-2 h-8"
    >
      {isLoading ? (
        <>
          <span className="loader" />
          Loading...
        </>
      ) : isPlaying ? (
        "⏸ Pause"
      ) : (
        "▶️ Play"
      )}{" "}
    </button>
  );
};

export default PlayControl;
