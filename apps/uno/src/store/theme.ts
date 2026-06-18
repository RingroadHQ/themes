import { atom } from "nanostores";
import type { ThemeConfig } from "../data/types";

export const themeConfig = atom<ThemeConfig | null>(null);

export function setTheme(config: ThemeConfig): void {
  themeConfig.set(config);
}
