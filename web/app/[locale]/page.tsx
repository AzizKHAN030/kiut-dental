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
import { getPageSections, getNavLinks } from '@/lib/sanity';

// Component mapping for section types
const sectionComponents: Record<string, React.ComponentType<{ data: any }>> = {
  heroSection: Hero,
  featureCardsSection: Benefits,
  popularTreatmentsSection: Services,
  priceComparisonSection: PriceComparison,
  additionalServicesSection: AdditionalServices,
  processSection: Process,
  gallerySection: Gallery,
  testimonialsSection: Testimonials,
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> | { locale: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams?.locale;
  
  // Validate locale
  if (!locale || !(await isLocale(locale))) {
    notFound();
  }

  // Fetch sections in order and other data from Sanity
  const [sections, locales, navLinks] = await Promise.all([
    getPageSections(locale),
    getSupportedLocales(),
    getNavLinks(locale),
  ]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Navbar locale={locale} locales={locales} navLinks={navLinks} />
      <FloatingTooth />
      <main>
        {sections
          .filter((section: any) => section.isActive !== false) // Safety check: filter out inactive sections
          .map((section: any, index: number) => {
          const Component = sectionComponents[section._type];
          if (!Component) {
            console.warn(`Unknown section type: ${section._type}`);
            return null;
          }

          // Determine section ID: use navLinkId if available, otherwise derive from section type
          let sectionId: string;
          if (section._type === 'heroSection') {
            // Hero section always uses "home" as id
            sectionId = 'home';
          } else if (section.navLinkId) {
            // Use navLinkId if provided
            sectionId = section.navLinkId;
          } else {
            // Fallback: derive from section type (e.g., "featureCardsSection" -> "benefits")
            const typeMap: Record<string, string> = {
              featureCardsSection: 'benefits',
              popularTreatmentsSection: 'services',
              priceComparisonSection: 'pricing',
              additionalServicesSection: 'additional-services',
              processSection: 'process',
              gallerySection: 'gallery',
              testimonialsSection: 'testimonials',
            };
            sectionId = typeMap[section._type] || `section-${index}`;
          }

          return (
            <div key={`${section._type}-${index}`} id={sectionId}>
              <Component data={section} />
            </div>
          );
        })}
        
        {/* Always render Blog and Contact sections at the end */}
        <div id="blog">
          <Blog />
        </div>
        <div id="contact">
          <CTA />
        </div>
      </main>
    </div>
  );
}
