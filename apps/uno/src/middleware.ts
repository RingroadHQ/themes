import { defineMiddleware } from "astro:middleware";
import { loadTheme } from "./theme/loader";

export const onRequest = defineMiddleware((context, next) => {
  // In production: detect tenant from host header or X-Tenant-ID
  const themeId = context.url.hostname;
  const theme = loadTheme(themeId);
  context.locals.theme = theme;
  return next();
});
