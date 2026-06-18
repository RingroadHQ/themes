import type { ThemeConfig } from "../data/types";
import { defaultTheme } from "./default";

/**
 * Load theme configuration for a given tenant.
 * In production, this would fetch from an API or database.
 * For the template, we return the default wallet-brand theme.
 */
export function loadTheme(_themeId?: string): ThemeConfig {
  // In production: fetch theme from multi-tenant API
  // const response = await fetch(`/api/themes/${themeId}`);
  // return response.json();
  return defaultTheme;
}

/**
 * Generate CSS custom properties string from a theme config.
 * These are injected into :root by the ThemeStyle component.
 */
export function themeToCSSProperties(theme: ThemeConfig): string {
  const { colors, typography } = theme;

  return [
    `--color-primary: ${colors.primary};`,
    `--color-primary-content: ${colors.primaryContent};`,
    `--color-secondary: ${colors.secondary};`,
    `--color-secondary-content: ${colors.secondaryContent};`,
    `--color-accent: ${colors.accent};`,
    `--color-accent-content: ${colors.accentContent};`,
    `--color-base-100: ${colors.base100};`,
    `--color-base-200: ${colors.base200};`,
    `--color-base-300: ${colors.base300};`,
    `--color-base-content: ${colors.baseContent};`,
    `--color-success: ${colors.success};`,
    `--color-warning: ${colors.warning};`,
    `--color-error: ${colors.error};`,
    `--font-heading: ${typography.headingFont};`,
    `--font-sans: ${typography.bodyFont};`,
    `--font-base-size: ${typography.baseSize};`,
    `--font-heading-weight: ${typography.headingWeight};`,
  ].join("\n    ");
}
