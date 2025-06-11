import { Theme } from "@/hooks/interface";

export const menuTheme: Record<Theme.ThemeType, { [key: string]: string }> = {
  light: {
    "--el-menu-bg-color": "#ffffff",
    "--el-menu-hover-bg-color": "#f5f7fa",
    "--el-menu-active-bg-color": "var(--el-color-primary-light-9)",
    "--el-menu-text-color": "#333333",
    "--el-menu-active-color": "var(--el-color-primary)",
    "--el-menu-hover-text-color": "#333333",
    "--el-menu-horizontal-sub-item-height": "50px",
    "--el-menu-sub-item-hover-bg-color": "#f0f2f5",
    "--el-menu-transition-duration": "0.15s",
    "--el-menu-popup-transition-duration": "0.2s"
  },
  inverted: {
    "--el-menu-bg-color": "#191a20",
    "--el-menu-hover-bg-color": "#2c2e34",
    "--el-menu-active-bg-color": "#000000",
    "--el-menu-text-color": "#bdbdc0",
    "--el-menu-active-color": "#ffffff",
    "--el-menu-hover-text-color": "#ffffff",
    "--el-menu-horizontal-sub-item-height": "50px",
    "--el-menu-sub-item-hover-bg-color": "#2a2c32",
    "--el-menu-transition-duration": "0.15s",
    "--el-menu-popup-transition-duration": "0.2s"
  },
  dark: {
    "--el-menu-bg-color": "#141414",
    "--el-menu-hover-bg-color": "#262626",
    "--el-menu-active-bg-color": "#000000",
    "--el-menu-text-color": "#bdbdc0",
    "--el-menu-active-color": "#ffffff",
    "--el-menu-hover-text-color": "#ffffff",
    "--el-menu-horizontal-sub-item-height": "50px",
    "--el-menu-sub-item-hover-bg-color": "#1f1f1f",
    "--el-menu-transition-duration": "0.15s",
    "--el-menu-popup-transition-duration": "0.2s"
  }
};
