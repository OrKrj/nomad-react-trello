import "styled-components";
import theme from "./theme";

type theme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    boardColor: string;
    cardColor: string;
  }
}
