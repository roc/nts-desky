const PlayControl = ({
  id,
  isPlaying = false,
  onPress,
}: {
  id: string;
  isPlaying: boolean;
  onPress: () => void;
}) => {
  return (
    <button id={id} onClick={onPress}>
      {id} {isPlaying ? "playing 🟢" : "not playing 🔴"}
    </button>
  );
};

export default PlayControl;
