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
    <div
      style={{
        display: "flex",
      }}
    >
      <button id={id} onClick={onPress}>
        {isLoading ? "⏳ Loading..." : isPlaying ? "⏸ Pause" : "▶️ Play"}{" "}
      </button>
    </div>
  );
};

export default PlayControl;
