import { useEffect, useRef } from "react";

export function usePollingEffect({
  asyncCallback,
  dependencies = [],
  interval = 10000, // 10 seconds,
  onCleanUp = () => {
    //noop
  },
}: {
  asyncCallback: () => Promise<void>;
  dependencies?: any[];
  interval: number;
  onCleanUp?: () => void;
}) {
  const timeoutIdRef = useRef(null);
  useEffect(() => {
    let _stopped = false;
    (async function pollingCallback() {
      try {
        await asyncCallback();
      } finally {
        // Set timeout after it finished, unless stopped
        timeoutIdRef.current =
          !_stopped && setTimeout(pollingCallback, interval);
      }
    })();
    // Clean up if dependencies change
    return () => {
      _stopped = true; // prevent race conditions
      clearTimeout(timeoutIdRef.current);
      onCleanUp();
    };
  }, [...dependencies, interval]);
}
