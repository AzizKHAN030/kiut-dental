import { cookies, headers } from 'next/headers';
import { getDefaultLocale, isLocale } from './i18n';

const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

/**
 * Get the current locale from cookies, headers, or URL path
 * This function can be used in server components and server actions
 */
export async function getLocale(): Promise<string> {
  // Try to get from header first (set by middleware from URL path)
  const headersList = await headers();
  const localeHeader = headersList.get('x-locale');

  if (localeHeader && (await isLocale(localeHeader))) {
    return localeHeader;
  }

  // Try to get from cookie
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  if (localeCookie && (await isLocale(localeCookie))) {
    return localeCookie;
  }

  return await getDefaultLocale();
}

/**
 * Set the locale cookie (client-side)
 */
export async function setLocaleCookie(locale: string) {
  if (typeof document !== 'undefined' && (await isLocale(locale))) {
    document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  }
}
