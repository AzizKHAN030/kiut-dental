import { redirect } from 'next/navigation';
import { getDefaultLocale } from '@/lib/i18n';

// Root page redirects to default locale
export default function RootPage() {
  const defaultLocale = getDefaultLocale();
  redirect(`/${defaultLocale}`);
}
