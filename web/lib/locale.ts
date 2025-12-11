import { cookies, headers } from 'next/headers';
import { getLocaleFromPath } from './i18n';

const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
const DEFAULT_LOCALE = 'en';
const SUPPORTED_LOCALES = ['en', 'ru'];

/**
 * Get the current locale from cookies, headers, or URL path
 * This function can be used in server components and server actions
 */
export async function getLocale(): Promise<string> {
  // Try to get from header first (set by middleware from URL path)
  const headersList = await headers();
  const localeHeader = headersList.get('x-locale');

  if (localeHeader && SUPPORTED_LOCALES.includes(localeHeader)) {
    return localeHeader;
  }

  // Try to get from cookie
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  if (localeCookie && SUPPORTED_LOCALES.includes(localeCookie)) {
    return localeCookie;
  }

  return DEFAULT_LOCALE;
}

/**
 * Set the locale cookie (client-side)
 */
export function setLocaleCookie(locale: string) {
  if (typeof document !== 'undefined' && SUPPORTED_LOCALES.includes(locale)) {
    document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  }
}
