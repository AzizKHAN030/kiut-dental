import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Benefits } from '@/components/Benefits';
import { Services } from '@/components/Services';
import { PriceComparison } from '@/components/PriceComparison';
import { AdditionalServices } from '@/components/AdditionalServices';
import { Process } from '@/components/Process';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { Blog } from '@/components/Blog';
import { CTA } from '@/components/CTA';
import { FloatingTooth } from '@/components/FloatingTooth';
import { notFound } from 'next/navigation';
import { isLocale, getSupportedLocales } from '@/lib/i18n';
import { getHeroData, getFeatureCardsData, getPopularTreatmentsData, getPriceComparisonData, getAdditionalServicesData, getProcessData, getGalleryData, getTestimonialsData } from '@/lib/sanity';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> | { locale: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams?.locale;
  
  // Validate locale
  if (!locale || !(await isLocale(locale))) {
    notFound();
  }

  // Fetch data from Sanity
  const [heroData, benefitsData, servicesData, priceComparisonData, additionalServicesData, processData, galleryData, testimonialsData, locales] = await Promise.all([
    getHeroData(locale),
    getFeatureCardsData(locale),
    getPopularTreatmentsData(locale),
    getPriceComparisonData(locale),
    getAdditionalServicesData(locale),
    getProcessData(locale),
    getGalleryData(locale),
    getTestimonialsData(locale),
    getSupportedLocales(),
  ]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Navbar locale={locale} locales={locales} />
      <FloatingTooth />
      <div id="home">
        <Hero data={heroData} />
      </div>
      <div id="benefits">
        <Benefits data={benefitsData} />
      </div>
      <div id="services">
        <Services data={servicesData} />
      </div>
      <div id="pricing">
        <PriceComparison data={priceComparisonData} />
      </div>
      <AdditionalServices data={additionalServicesData} />
      <div id="process">
        <Process data={processData} />
      </div>
      <div id="gallery">
        <Gallery data={galleryData} />
      </div>
      <div id="testimonials">
        <Testimonials data={testimonialsData} />
      </div>
      <div id="blog">
        <Blog />
      </div>
      <div id="contact">
        <CTA />
      </div>
    </div>
  );
}
