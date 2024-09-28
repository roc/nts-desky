import clsx from "clsx";
const PlayControl = ({
  id,
  isPlaying = false,
  onPress,
  isLoading,
  className,
  paused,
}: {
  id: string;
  isPlaying: boolean;
  onPress: () => void;
  isLoading: boolean;
  className?: string;
  paused: boolean;
}) => {
  const playIcon = isPlaying ? (paused ? "▶️" : "⏸") : "▶️";
  return (
    <div className={clsx("text-3xl w-6 mx-2 mr-3", className)}>
      {isLoading && (
        <>
          <span className="inline-block animate-pulse animate-spin">꩜</span>
        </>
      )}
      {!isLoading && (
        <button id={id} onClick={onPress}>
          {playIcon}
        </button>
      )}
    </div>
  );
};

export default PlayControl;
