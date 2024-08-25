import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const currentHour = new Intl.DateTimeFormat(navigator.language, {
    hour: "numeric",
    hour12: false,
  }).format(new Date());

  const isNight =
    (currentHour >= 18 && currentHour <= 24) ||
    (currentHour >= 0 && currentHour <= 6);

  const [isDarkMode, setIsDarkMode] = useState(isNight);

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
