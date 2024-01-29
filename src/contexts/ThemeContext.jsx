import React, { createContext, useState } from "react";

const initialValues = {
  mode: "light",
  toggleTheme: () => {},
};

const ThemeContext = createContext(initialValues);

function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((currentMode) => (currentMode === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ mode, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, ThemeProvider };
