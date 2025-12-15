import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'mh9vfjvg',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Locale configuration queries
export async function getLocales() {
  const query = `*[_type == "locale" && isActive == true] | order(isDefault desc, code asc) {
    code,
    name,
    flag,
    isDefault,
    isActive
  }`;
  
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching locales from Sanity:', error);
    // Fallback to English only if Sanity fails
    return [
      { code: 'en', name: 'English', flag: '🇬🇧', isDefault: true, isActive: true },
    ];
  }
}

export async function getDefaultLocale() {
  const query = `*[_type == "locale" && isDefault == true && isActive == true][0].code`;
  
  try {
    const defaultLocale = await client.fetch(query);
    return defaultLocale || 'en';
  } catch (error) {
    console.error('Error fetching default locale from Sanity:', error);
    return 'en';
  }
}

// Blog post queries
// Note: locale can be a reference or a string (for backward compatibility)
export async function getBlogPosts(locale: string = 'en') {
  const query = `*[_type == "blogPost" && (locale._ref == *[_type == "locale" && code == $locale][0]._id || locale->code == $locale || locale == $locale)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    locale,
    author {
      name,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      }
    },
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    categories[]-> {
      _id,
      name,
      slug
    },
    featured
  }`;
  
  return await client.fetch(query, { locale });
}

export async function getBlogPost(slug: string, locale: string = 'en') {
  if (!slug || typeof slug !== 'string') {
    throw new Error('Invalid slug provided');
  }

  const query = `*[_type == "blogPost" && slug.current == $slug && (locale._ref == *[_type == "locale" && code == $locale][0]._id || locale->code == $locale || locale == $locale)][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    locale,
    author {
      name,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      }
    },
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt,
      caption
    },
    categories[]-> {
      _id,
      name,
      slug
    },
    content[] {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    seo
  }`;
  
  try {
    return await client.fetch(query, { slug, locale });
  } catch (error) {
    console.error('Error fetching blog post from Sanity:', error);
    throw error;
  }
}

export async function getFeaturedBlogPosts(locale: string = 'en') {
  const query = `*[_type == "blogPost" && featured == true && (locale._ref == *[_type == "locale" && code == $locale][0]._id || locale->code == $locale || locale == $locale)] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    locale,
    author {
      name,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      }
    },
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    categories[]-> {
      _id,
      name,
      slug
    }
  }`;
  
  return await client.fetch(query, { locale });
}

export async function getLatestBlogPosts(limit: number = 4, locale: string = 'en') {
  const query = `*[_type == "blogPost" && (locale._ref == *[_type == "locale" && code == $locale][0]._id || locale->code == $locale || locale == $locale)] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    locale,
    author {
      name,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      }
    },
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    categories[]-> {
      _id,
      name,
      slug
    }
  }`;
  
  return await client.fetch(query, { locale });
}

// Hero section queries
// Note: Slugs can be stored with locale suffix (e.g., "home-en", "home-ru") or as "home"
// The query checks for both formats to support existing and new pages
// The actual URL routing is handled by Next.js [locale] route
export async function getHeroData(locale: string = 'en') {
  const query = `*[_type == "page" && (locale._ref == *[_type == "locale" && code == $locale][0]._id || locale->code == $locale || locale == $locale) && (slug.current == "home" || slug.current == $slugWithLocale)][0] {
    sections[] {
      _type == "heroSection" => {
        _type,
        displayMode,
        autoplay,
        autoplayInterval,
        slides[] {
          _type,
          tagline,
          heading,
          body,
          contentPosition,
          overlay,
          primaryCtaLabel,
          primaryCtaHref,
          secondaryCtaLabel,
          secondaryCtaHref,
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          },
          stats[] {
            value,
            label
          },
          badgeTitle,
          badgeSubtitle
        }
      }
    }
  }`;
  
  try {
    const slugWithLocale = `home-${locale}`;
    const result = await client.fetch(query, { locale, slugWithLocale });
    // Extract the hero section from the sections array
    const heroSection = result?.sections?.find((section: any) => section._type === 'heroSection');
    return heroSection || null;
  } catch (error) {
    console.error('Error fetching hero data from Sanity:', error);
    return null;
  }
}

// Benefits / Feature Cards section queries
export async function getFeatureCardsData(locale: string = 'en') {
  const query = `*[_type == "page" && (locale._ref == *[_type == "locale" && code == $locale][0]._id || locale->code == $locale || locale == $locale) && (slug.current == "home" || slug.current == $slugWithLocale)][0] {
    sections[] {
      _type == "featureCardsSection" => {
        _type,
        title,
        subtitle,
        items[] {
          icon {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          },
          iconBgColor {
            hex
          },
          title,
          description,
          badge
        }
      }
    }
  }`;
  
  try {
    const slugWithLocale = `home-${locale}`;
    const result = await client.fetch(query, { locale, slugWithLocale });
    // Extract the feature cards section from the sections array
    const featureCardsSection = result?.sections?.find((section: any) => section._type === 'featureCardsSection');
    return featureCardsSection || null;
  } catch (error) {
    console.error('Error fetching feature cards data from Sanity:', error);
    return null;
  }
}

// Popular Treatments section queries
export async function getPopularTreatmentsData(locale: string = 'en') {
  const query = `*[_type == "page" && (locale._ref == *[_type == "locale" && code == $locale][0]._id || locale->code == $locale || locale == $locale) && (slug.current == "home" || slug.current == $slugWithLocale)][0] {
    sections[] {
      _type == "popularTreatmentsSection" => {
        _type,
        title,
        subtitle,
        treatments[] {
          nameSource,
          treatment-> {
            _id,
            name,
            slug
          },
          customName,
          shortDescription,
          startingPrice,
          duration,
          badge,
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          }
        }
      }
    }
  }`;
  
  try {
    const slugWithLocale = `home-${locale}`;
    const result = await client.fetch(query, { locale, slugWithLocale });
    // Extract the popular treatments section from the sections array
    const popularTreatmentsSection = result?.sections?.find((section: any) => section._type === 'popularTreatmentsSection');
    return popularTreatmentsSection || null;
  } catch (error) {
    console.error('Error fetching popular treatments data from Sanity:', error);
    return null;
  }
}

// Additional Services section queries
export async function getAdditionalServicesData(locale: string = 'en') {
  const query = `*[_type == "page" && (locale._ref == *[_type == "locale" && code == $locale][0]._id || locale->code == $locale || locale == $locale) && (slug.current == "home" || slug.current == $slugWithLocale)][0] {
    sections[] {
      _type == "additionalServicesSection" => {
        _type,
        title,
        subtitle,
        badgeText,
        services[] {
          icon {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          },
          iconBgColor {
            hex
          },
          title,
          description,
          included
        },
        infoCards[] {
          icon {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          },
          title,
          description,
          bgColor {
            hex
          }
        }
      }
    }
  }`;
  
  try {
    const slugWithLocale = `home-${locale}`;
    const result = await client.fetch(query, { locale, slugWithLocale });
    // Extract the additional services section from the sections array
    const additionalServicesSection = result?.sections?.find((section: any) => section._type === 'additionalServicesSection');
    return additionalServicesSection || null;
  } catch (error) {
    console.error('Error fetching additional services data from Sanity:', error);
    return null;
  }
}

// Process section queries
export async function getProcessData(locale: string = 'en') {
  const query = `*[_type == "page" && (locale._ref == *[_type == "locale" && code == $locale][0]._id || locale->code == $locale || locale == $locale) && (slug.current == "home" || slug.current == $slugWithLocale)][0] {
    sections[] {
      _type == "processSection" => {
        _type,
        title,
        subtitle,
        steps[] {
          title,
          description,
          icon {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          }
        }
      }
    }
  }`;
  
  try {
    const slugWithLocale = `home-${locale}`;
    const result = await client.fetch(query, { locale, slugWithLocale });
    // Extract the process section from the sections array
    const processSection = result?.sections?.find((section: any) => section._type === 'processSection');
    return processSection || null;
  } catch (error) {
    console.error('Error fetching process data from Sanity:', error);
    return null;
  }
}

// Gallery section queries
export async function getGalleryData(locale: string = 'en') {
  const query = `*[_type == "page" && (locale._ref == *[_type == "locale" && code == $locale][0]._id || locale->code == $locale || locale == $locale) && (slug.current == "home" || slug.current == $slugWithLocale)][0] {
    sections[] {
      _type == "gallerySection" => {
        _type,
        title,
        subtitle,
        images[] {
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          },
          title,
          description
        }
      }
    }
  }`;
  
  try {
    const slugWithLocale = `home-${locale}`;
    const result = await client.fetch(query, { locale, slugWithLocale });
    // Extract the gallery section from the sections array
    const gallerySection = result?.sections?.find((section: any) => section._type === 'gallerySection');
    return gallerySection || null;
  } catch (error) {
    console.error('Error fetching gallery data from Sanity:', error);
    return null;
  }
}

// Treatments queries
export async function getTreatments() {
  const query = `*[_type == "treatment" && isActive == true] | order(name asc) {
    _id,
    name,
    slug,
    description
  }`;
  
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching treatments from Sanity:', error);
    return [];
  }
}

// Testimonials section queries
export async function getTestimonialsData(locale: string = 'en') {
  const query = `*[_type == "page" && (locale._ref == *[_type == "locale" && code == $locale][0]._id || locale->code == $locale || locale == $locale) && (slug.current == "home" || slug.current == $slugWithLocale)][0] {
    sections[] {
      _type == "testimonialsSection" => {
        _type,
        title,
        subtitle,
        testimonials[] {
          name,
          country,
          treatment-> {
            _id,
            name,
            slug
          },
          rating,
          text,
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          }
        }
      }
    }
  }`;
  
  try {
    const slugWithLocale = `home-${locale}`;
    const result = await client.fetch(query, { locale, slugWithLocale });
    // Extract the testimonials section from the sections array
    const testimonialsSection = result?.sections?.find((section: any) => section._type === 'testimonialsSection');
    return testimonialsSection || null;
  } catch (error) {
    console.error('Error fetching testimonials data from Sanity:', error);
    return null;
  }
}

// Price Comparison section queries
export async function getPriceComparisonData(locale: string = 'en') {
  const query = `*[_type == "page" && (locale._ref == *[_type == "locale" && code == $locale][0]._id || locale->code == $locale || locale == $locale) && (slug.current == "home" || slug.current == $slugWithLocale)][0] {
    sections[] {
      _type == "priceComparisonSection" => {
        _type,
        title,
        subtitle,
        countries[] {
          country-> {
            name,
            code,
            flag
          },
          isHighlighted
        },
        treatments[] {
          nameSource,
          treatment-> {
            _id,
            name,
            slug
          },
          customName,
          prices[] {
            country-> {
              code,
              name
            },
            price
          }
        },
        baseCountry-> {
          code,
          name
        },
        footerNotes[] {
          title,
          description
        }
      }
    }
  }`;
  
  try {
    const slugWithLocale = `home-${locale}`;
    const result = await client.fetch(query, { locale, slugWithLocale });
    // Extract the price comparison section from the sections array
    const priceComparisonSection = result?.sections?.find((section: any) => section._type === 'priceComparisonSection');
    return priceComparisonSection || null;
  } catch (error) {
    console.error('Error fetching price comparison data from Sanity:', error);
    return null;
  }
}

// Get all page sections in order with complete data
export async function getPageSections(locale: string = 'en') {
  const query = `*[_type == "page" && (locale._ref == *[_type == "locale" && code == $locale][0]._id || locale->code == $locale || locale == $locale) && (slug.current == "home" || slug.current == $slugWithLocale)][0] {
    sections[] {
      _type,
      navLinkTitle,
      navLinkId,
      isActive,
      includeInNavbar,
      // Hero Section
      _type == "heroSection" => {
        _type,
        navLinkTitle,
        navLinkId,
        isActive,
        includeInNavbar,
        displayMode,
        autoplay,
        autoplayInterval,
        slides[] {
          _type,
          tagline,
          heading,
          body,
          contentPosition,
          overlay,
          primaryCtaLabel,
          primaryCtaHref,
          secondaryCtaLabel,
          secondaryCtaHref,
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          },
          stats[] {
            value,
            label
          },
          badgeTitle,
          badgeSubtitle
        }
      },
      // Feature Cards Section
      _type == "featureCardsSection" => {
        _type,
        navLinkTitle,
        navLinkId,
        isActive,
        includeInNavbar,
        title,
        subtitle,
        items[] {
          icon {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          },
          iconBgColor {
            hex
          },
          title,
          description,
          badge
        }
      },
      // Popular Treatments Section
      _type == "popularTreatmentsSection" => {
        _type,
        navLinkTitle,
        navLinkId,
        isActive,
        includeInNavbar,
        title,
        subtitle,
        treatments[] {
          nameSource,
          treatment-> {
            _id,
            name,
            slug
          },
          customName,
          shortDescription,
          startingPrice,
          duration,
          badge,
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          }
        }
      },
      // Price Comparison Section
      _type == "priceComparisonSection" => {
        _type,
        navLinkTitle,
        navLinkId,
        isActive,
        includeInNavbar,
        title,
        subtitle,
        countries[] {
          country-> {
            name,
            code,
            flag
          },
          isHighlighted
        },
        treatments[] {
          nameSource,
          treatment-> {
            _id,
            name,
            slug
          },
          customName,
          prices[] {
            country-> {
              code,
              name
            },
            price
          }
        },
        baseCountry-> {
          code,
          name
        },
        footerNotes[] {
          title,
          description
        }
      },
      // Additional Services Section
      _type == "additionalServicesSection" => {
        _type,
        navLinkTitle,
        navLinkId,
        isActive,
        includeInNavbar,
        title,
        subtitle,
        badgeText,
        services[] {
          icon {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          },
          iconBgColor {
            hex
          },
          title,
          description,
          included
        },
        infoCards[] {
          icon {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          },
          title,
          description,
          bgColor {
            hex
          }
        }
      },
      // Process Section
      _type == "processSection" => {
        _type,
        navLinkTitle,
        navLinkId,
        isActive,
        includeInNavbar,
        title,
        subtitle,
        steps[] {
          title,
          description,
          icon {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          }
        }
      },
      // Gallery Section
      _type == "gallerySection" => {
        _type,
        navLinkTitle,
        navLinkId,
        isActive,
        includeInNavbar,
        title,
        subtitle,
        images[] {
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          },
          title,
          description
        }
      },
      // Testimonials Section
      _type == "testimonialsSection" => {
        _type,
        navLinkTitle,
        navLinkId,
        isActive,
        includeInNavbar,
        title,
        subtitle,
        testimonials[] {
          name,
          country,
          treatment-> {
            _id,
            name,
            slug
          },
          rating,
          text,
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          }
        }
      }
    }
  }`;
  
  try {
    const slugWithLocale = `home-${locale}`;
    const result = await client.fetch(query, { locale, slugWithLocale });
    // Return sections array in order, filtering out:
    // - null/undefined sections
    // - inactive sections (isActive === false, default to true if not set)
    return result?.sections?.filter((section: any) => 
      section && 
      section._type && 
      (section.isActive !== false) // Default to true if not set
    ) || [];
  } catch (error) {
    console.error('Error fetching page sections from Sanity:', error);
    return [];
  }
}

// Navigation links query - fetches all sections with nav link info
export async function getNavLinks(locale: string = 'en') {
  const query = `*[_type == "page" && (locale._ref == *[_type == "locale" && code == $locale][0]._id || locale->code == $locale || locale == $locale) && (slug.current == "home" || slug.current == $slugWithLocale)][0] {
    sections[] {
      _type,
      navLinkTitle,
      navLinkId,
      isActive,
      includeInNavbar
    }
  }`;
  
  try {
    const slugWithLocale = `home-${locale}`;
    const result = await client.fetch(query, { locale, slugWithLocale });
    
    // Filter sections that have navLinkTitle and navLinkId, and map them to nav links
    const navLinks: Array<{ name: string; href: string }> = [];
    
    if (result?.sections) {
      result.sections.forEach((section: any) => {
        // Only include sections that:
        // - Have both navLinkTitle and navLinkId
        // - Are active (isActive !== false, default to true)
        // - Have includeInNavbar enabled (includeInNavbar !== false, default to true)
        if (
          section.navLinkTitle && 
          section.navLinkId &&
          (section.isActive !== false) &&
          (section.includeInNavbar !== false)
        ) {
          navLinks.push({
            name: section.navLinkTitle,
            href: `#${section.navLinkId}`,
          });
        }
      });
    }
    
    // Add hardcoded links for Blog and Contact (these are always shown)
    navLinks.push(
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '#contact' }
    );
    
    return navLinks;
  } catch (error) {
    console.error('Error fetching nav links from Sanity:', error);
    // Return default nav links on error
    return [
      { name: 'Benefits', href: '#benefits' },
      { name: 'Services', href: '#services' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Process', href: '#process' },
      { name: 'Gallery', href: '#gallery' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '#contact' },
    ];
  }
}

// Footer query
export async function getFooterData(locale: string = 'en') {
  const query = `*[_type == "page" && (locale._ref == *[_type == "locale" && code == $locale][0]._id || locale->code == $locale || locale == $locale) && (slug.current == "home" || slug.current == $slugWithLocale)][0] {
    footer {
      title,
      subtitle,
      phone {
        number,
        href,
        show
      },
      email {
        address,
        show
      },
      whatsapp {
        number,
        href,
        show
      },
      telegram {
        username,
        href,
        show
      },
      facebook {
        url,
        show
      },
      address {
        text,
        show
      },
      googleMaps {
        show,
        iframeCode
      }
    }
  }`;
  
  try {
    const slugWithLocale = `home-${locale}`;
    const result = await client.fetch(query, { locale, slugWithLocale });
    return result?.footer || null;
  } catch (error) {
    console.error('Error fetching footer data from Sanity:', error);
    return null;
  }
}

