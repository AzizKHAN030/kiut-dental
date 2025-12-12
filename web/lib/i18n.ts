export type Locale = string;

/**
 * Get all supported locales from Sanity
 */
export async function getSupportedLocales(): Promise<Array<{ code: string; name: string; flag: string; isDefault: boolean }>> {
  try {
    const { getLocales } = await import('./sanity');
    return await getLocales();
  } catch (error) {
    console.error('Failed to fetch locales from Sanity:', error);
    throw error;
  }
}

/**
 * Get supported locale codes
 */
export async function getSupportedLocaleCodes(): Promise<string[]> {
  const locales = await getSupportedLocales();
  return locales.map(l => l.code);
}

/**
 * Check if a locale is supported
 */
export async function isLocale(locale: string): Promise<boolean> {
  const codes = await getSupportedLocaleCodes();
  return codes.includes(locale);
}

/**
 * Get the default locale
 */
export async function getDefaultLocale(): Promise<string> {
  try {
    const { getDefaultLocale: getDefault } = await import('./sanity');
    return await getDefault();
  } catch (error) {
    console.error('Failed to fetch default locale from Sanity:', error);
    throw error;
  }
}

/**
 * Generate a localized URL path (synchronous)
 * @param path - The path without locale (e.g., '/blog' or '/blog/my-post')
 * @param locale - The locale to use
 * @returns The localized path (e.g., '/en/blog' or '/ru/blog/my-post')
 */
export function getLocalizedPath(path: string, locale: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Don't add locale prefix if it's already there
  if (normalizedPath.startsWith(`/${locale}/`)) {
    return normalizedPath;
  }
  
  // Remove any existing locale prefix (broad pattern to handle any 2-5 char locale)
  const pathWithoutLocale = normalizedPath.replace(/^\/[a-z]{2}(-[A-Z]{2})?(\/|$)/, '/');
  
  // Add the locale prefix
  return `/${locale}${pathWithoutLocale}`;
}

/**
 * Get locale from a pathname (synchronous)
 * @param pathname - The pathname (e.g., '/en/blog' or '/ru/blog/my-post')
 * @returns The locale or null if not found
 */
export function getLocaleFromPath(pathname: string): string | null {
  // Match any 2-5 character locale code at the start of the path
  const match = pathname.match(/^\/([a-z]{2}(-[A-Z]{2})?)(\/|$)/);
  if (match) {
    return match[1];
  }
  return null;
}

/**
 * Remove locale prefix from a pathname (synchronous)
 * @param pathname - The pathname (e.g., '/en/blog' or '/ru/blog/my-post')
 * @returns The pathname without locale (e.g., '/blog' or '/blog/my-post')
 */
export function removeLocaleFromPath(pathname: string): string {
  return pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '') || '/';
}
