import { redirect } from 'next/navigation';
import { getDefaultLocale } from '@/lib/i18n';

// Root page redirects to default locale
export default async function RootPage() {
  const defaultLocale = await getDefaultLocale();
  redirect(`/${defaultLocale}`);
}
