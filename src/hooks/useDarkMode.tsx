import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import useMediaQuery from "./useMediaQuery";
import useUpdateEffect from "./useUpdateEffect";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

interface UseDarkModeOutput {
  isDarkMode: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    "theme-dark-mode",
    defaultValue ?? isDarkOS ?? false
  );

  // Update darkMode if os prefers changes
  useUpdateEffect(() => {
    setDarkMode(isDarkOS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkOS]);

  useEffect(() => {
    const root = window.document.querySelector("html");
    if (root) {
      if (isDarkMode) {
        root.dataset.theme = "dark";
      } else {
        root.dataset.theme = "light";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  return {
    isDarkMode,
    toggle: () => setDarkMode((prev) => !prev),
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
  };
}

export default useDarkMode;
