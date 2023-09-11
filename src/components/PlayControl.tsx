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
    <>
      <button id={id} onClick={onPress}>
        {isLoading ? "⏳ Loading..." : isPlaying ? "⏸ Pause" : "▶️ Play"}{" "}
      </button>
    </>
  );
};

export default PlayControl;
