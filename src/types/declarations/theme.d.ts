import "styled-components/native";
import { IThemePattern } from "@/global/theme/types";

declare module "styled-components/native" {
  export interface DefaultTheme extends IThemePattern {}
}
