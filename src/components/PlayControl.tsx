const PlayControl = ({
  id,
  isPlaying = false,
  onPress,
}: {
  id: string;
  isPlaying: boolean;
  onPress: (id: string) => void;
}) => {
  return (
    <button id={id} onClick={(e) => onPress(id)}>
      {id} {isPlaying ? "playing 🟢" : "not playing 🔴"}
    </button>
  );
};

export default PlayControl;
