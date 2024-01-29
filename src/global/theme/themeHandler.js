import { darkColors, lightColors } from "./colors";
import shape from "./shape";
import typography from "./typography";
import shadows from "./shadows";

const themeHandler = (mode) => {
  return {
    colors: mode === "light" ? lightColors : darkColors,
    typography,
    shape,
    shadows,
  };
};

export default themeHandler;
