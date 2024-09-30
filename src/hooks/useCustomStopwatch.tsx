import { useEffect, useState } from "react";
import { useStopwatch } from "react-use-precision-timer";

export default function useCustomStopwatch() {
  const [renderTime, setRenderTime] = useState(new Date().getTime());
  const stopwatch = useStopwatch();
  const { isRunning } = stopwatch;

  useEffect(() => {
    let timeout: any;
    if (isRunning()) {
      timeout = setTimeout(() => setRenderTime(new Date().getTime()), 1);
    }

    return () => {
      clearTimeout(timeout);
    };
  });

  return stopwatch;
}
