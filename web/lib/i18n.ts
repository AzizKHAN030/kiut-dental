const DEFAULT_LOCALE = 'en';
const SUPPORTED_LOCALES = ['en', 'ru'] as const;

export type Locale = typeof SUPPORTED_LOCALES[number];

/**
 * Check if a locale is supported
 */
export function isLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

/**
 * Get the default locale
 */
export function getDefaultLocale(): Locale {
  return DEFAULT_LOCALE;
}

/**
 * Get all supported locales
 */
export function getSupportedLocales(): readonly Locale[] {
  return SUPPORTED_LOCALES;
}

/**
 * Generate a localized URL path
 * @param path - The path without locale (e.g., '/blog' or '/blog/my-post')
 * @param locale - The locale to use (defaults to 'en')
 * @returns The localized path (e.g., '/en/blog' or '/ru/blog/my-post')
 */
export function getLocalizedPath(path: string, locale: string = DEFAULT_LOCALE): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Don't add locale prefix if it's already there
  if (normalizedPath.startsWith(`/${locale}/`)) {
    return normalizedPath;
  }
  
  // Remove any existing locale prefix
  const pathWithoutLocale = normalizedPath.replace(/^\/(en|ru)\//, '/');
  
  // Add the locale prefix
  return `/${locale}${pathWithoutLocale}`;
}

/**
 * Get locale from a pathname
 * @param pathname - The pathname (e.g., '/en/blog' or '/ru/blog/my-post')
 * @returns The locale or null if not found
 */
export function getLocaleFromPath(pathname: string): Locale | null {
  const match = pathname.match(/^\/(en|ru)(\/|$)/);
  if (match && isLocale(match[1])) {
    return match[1];
  }
  return null;
}

/**
 * Remove locale prefix from a pathname
 * @param pathname - The pathname (e.g., '/en/blog' or '/ru/blog/my-post')
 * @returns The pathname without locale (e.g., '/blog' or '/blog/my-post')
 */
export function removeLocaleFromPath(pathname: string): string {
  return pathname.replace(/^\/(en|ru)/, '') || '/';
}
