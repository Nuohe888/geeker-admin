import { Theme } from "@/hooks/interface";

export const textTheme: Record<Theme.ThemeType, { [key: string]: string }> = {
  light: {
    "--text-color": "#4b5675"
  },
  inverted: {
    "--text-color": "#9a9cae"
  },
  dark: {
    "--text-color": "#9a9cae"
  }
};
