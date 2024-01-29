import { useContext } from "react";
import themeHandler from "../global/theme/themeHandler";
import { ThemeContext } from "../contexts/ThemeContext";

const useTheme = () => {
  const { mode } = useContext(ThemeContext);
  const theme = themeHandler(mode);
  return theme;
};

export default useTheme;
