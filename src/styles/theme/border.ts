import { Theme } from "@/hooks/interface";

export const borderTheme: Record<Theme.ThemeType, { [key: string]: string }> = {
  light: {
    "--border-color": "rgba(219, 223, 233, .6)"
  },
  inverted: {
    "--border-color": "rgba(54, 56, 67, .6)"
  },
  dark: {
    "--border-color": "rgba(54, 56, 67, .6)"
  }
};
