'use client';

import { useEffect, useState } from 'react';
import { Menu, Globe, X } from 'lucide-react';

const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

interface NavbarProps {
  locale?: string;
  locales?: Array<{ code: string; name: string; flag: string }>;
  navLinks?: Array<{ name: string; href: string }>;
}

export function Navbar({ locale: initialLocale, locales: providedLocales, navLinks: providedNavLinks }: NavbarProps = { locale: undefined, locales: undefined, navLinks: undefined }) {
  // Default nav links fallback
  const defaultNavLinks = [
    { name: 'Benefits', href: '#benefits' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Process', href: '#process' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#contact' },
  ];
  
  const navLinks = providedNavLinks || defaultNavLinks;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [languages, setLanguages] = useState<Array<{ code: string; name: string; flag: string }>>(providedLocales || []);
  
  // Update languages when providedLocales prop changes
  useEffect(() => {
    if (providedLocales && providedLocales.length > 0) {
      setLanguages(providedLocales);
    }
  }, [providedLocales]);
  
  // Initialize selectedLang from the locale prop (server-rendered value)
  // This ensures hydration matches between server and client
  const [selectedLang, setSelectedLang] = useState<{ code: string; name: string; flag: string } | null>(() => {
    // Use the locale prop if provided (from server)
    if (initialLocale && languages.length > 0) {
      const lang = languages.find(l => l.code === initialLocale);
      if (lang) return lang;
    }
    
    // Fallback: try to get from cookie (client-side only, but shouldn't happen if prop is passed)
    if (typeof document !== 'undefined' && languages.length > 0) {
      const cookies = document.cookie.split(';');
      const localeCookie = cookies.find(c => c.trim().startsWith(`${LOCALE_COOKIE_NAME}=`));
      const locale = localeCookie?.split('=')[1]?.trim();
      if (locale) {
        const lang = languages.find(l => l.code === locale);
        if (lang) return lang;
      }
    }
    
    // Default to first language if available, otherwise null
    return languages.length > 0 ? languages[0] : null;
  });
  
  // Update selectedLang when locale prop or languages change
  useEffect(() => {
    if (initialLocale) {
      const lang = languages.find(l => l.code === initialLocale);
      if (lang) {
        setSelectedLang(lang);
      }
    }
  }, [initialLocale, languages]);

  // Check if we're on the blog page
  const [isOnBlogPage, setIsOnBlogPage] = useState(false);
  
  useEffect(() => {
    const checkBlogPage = () => {
      if (typeof window === 'undefined') return;
      const currentPath = window.location.pathname;
      
      // Build dynamic regex pattern from all available locale codes
      const localeCodes = languages.map(l => l.code).join('|');
      const localePattern = new RegExp(`^/(${localeCodes})(/|$)`);
      
      // Remove any existing locale prefix
      const pathWithoutLocale = currentPath.replace(localePattern, '/');
      setIsOnBlogPage(pathWithoutLocale === '/blog');
    };
    
    checkBlogPage();
    // Check on route changes (for browser navigation)
    window.addEventListener('popstate', checkBlogPage);
    // Also check periodically in case of client-side navigation that doesn't trigger popstate
    const interval = setInterval(checkBlogPage, 500);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('popstate', checkBlogPage);
    };
  }, [languages]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle initial hash navigation on page load
  useEffect(() => {
    if (window.location.hash) {
      const scrollToHash = () => {
        const element = document.querySelector(window.location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
      
      // Delay to ensure page is fully rendered (especially when navigating from another page)
      setTimeout(scrollToHash, 200);
    }
  }, []);

  // Update URL hash as user scrolls through sections
  useEffect(() => {
    // Only run on home page
    const currentPath = window.location.pathname;
    
    // Build dynamic regex pattern from all available locale codes
    const localeCodes = languages.map(l => l.code).join('|');
    const localePattern = new RegExp(`^/(${localeCodes})(/|$)`);
    
    // Remove any existing locale prefix
    const pathWithoutLocale = currentPath.replace(localePattern, '/');
    const isOnHomePage = pathWithoutLocale === '/' || pathWithoutLocale === '';
    
    if (!isOnHomePage) return;

    let observer: IntersectionObserver | null = null;
    let observedSections: Element[] = [];

    // Small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      // Find all sections with IDs on the page (not just those in navbar)
      // This ensures URL updates even for sections not included in navigation
      // We look for divs with IDs inside the main element
      const mainElement = document.querySelector('main');
      if (!mainElement) return;
      
      // Get all elements with IDs inside main (sections)
      observedSections = Array.from(mainElement.querySelectorAll('[id]')).filter((el) => {
        const id = el.getAttribute('id');
        // Exclude empty IDs and common non-section IDs if needed
        return id && id.trim() !== '';
      });
      
      if (observedSections.length === 0) return;

      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section is in the upper portion of viewport
        threshold: 0,
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
              // Update URL without scrolling
              const newUrl = `${window.location.pathname}#${id}`;
              if (window.location.href !== newUrl) {
                window.history.replaceState(null, '', newUrl);
              }
            }
          }
        });
      }, observerOptions);

      // Store reference to observer for TypeScript
      const currentObserver = observer;
      observedSections.forEach((section) => currentObserver.observe(section));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (observer) {
        observedSections.forEach((section) => {
          if (observer) {
            observer.unobserve(section);
          }
        });
      }
    };
  }, [languages]); // Removed navLinks dependency since we now observe all sections, not just navbar links

  // Handle smooth scroll for anchor links
  const handleLinkClick = (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e?.preventDefault();
      setIsMobileMenuOpen(false);
      
      // Check if we're on the home page
      const currentPath = window.location.pathname;
      
      // Build dynamic regex pattern from all available locale codes
      const localeCodes = languages.map(l => l.code).join('|');
      const localePattern = new RegExp(`^/(${localeCodes})(/|$)`);
      
      // Remove any existing locale prefix
      const pathWithoutLocale = currentPath.replace(localePattern, '/');
      const isOnHomePage = pathWithoutLocale === '/' || pathWithoutLocale === '';
      
      if (isOnHomePage) {
        // We're on the home page, just scroll to the section
        const element = document.querySelector(href);
        if (element) {
          // Update URL hash before scrolling
          window.history.pushState(null, '', href);
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // We're on a different page, navigate to home page with hash
        const currentLocale = initialLocale || selectedLang?.code || (languages.length > 0 ? languages[0].code : 'en');
        const homeUrl = `/${currentLocale}${href}`;
        window.location.href = homeUrl;
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const handleLanguageSelect = (lang: typeof languages[0]) => {
    // Get current pathname without locale
    const currentPath = window.location.pathname;
    
    // Build dynamic regex pattern from all available locale codes
    const localeCodes = languages.map(l => l.code).join('|');
    const localePattern = new RegExp(`^/(${localeCodes})(/|$)`);
    
    // Remove any existing locale prefix
    const pathWithoutLocale = currentPath.replace(localePattern, '/');
    
    // Build new URL with selected locale
    const newPath = `/${lang.code}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    const newUrl = `${window.location.origin}${newPath}${window.location.search}${window.location.hash}`;
    
    // Set the locale cookie
    document.cookie = `${LOCALE_COOKIE_NAME}=${lang.code}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    
    setSelectedLang(lang);
    setIsLangMenuOpen(false);
    
    // Navigate to the new locale URL
    window.location.href = newUrl;
  };

  // Calculate language dropdown position
  const [langDropdownStyle, setLangDropdownStyle] = useState<React.CSSProperties>({});
  
  useEffect(() => {
    if (isLangMenuOpen) {
      const languageSelector = document.querySelector('.language-selector');
      if (languageSelector) {
        const rect = languageSelector.getBoundingClientRect();
        setLangDropdownStyle({
          position: 'fixed',
          top: `${rect.bottom + 8}px`,
          right: `${window.innerWidth - rect.right}px`,
        });
      }
    }
  }, [isLangMenuOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50`}
      >
        <div className={`w-full max-w-full px-6 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-lg shadow-lg' 
            : isOnBlogPage
              ? 'bg-transparent'
              : 'bg-blue-600'
        }`}>
          <div className="container mx-auto">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a 
              href="#home" 
              className="flex items-center gap-2 hover:scale-105 transition-transform"
              onClick={(e) => handleLinkClick('#home', e)}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C8 2 6 4 6 7C6 10 6 13 6 15C6 17 7 19 9 19C10 19 11 18 11 17C11 16 12 16 12 16C12 16 13 16 13 17C13 18 14 19 15 19C17 19 18 17 18 15C18 13 18 10 18 7C18 4 16 2 12 2Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <div className={`transition-colors ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  UzDental
                </div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.href, e)}
                  className={`transition-colors relative group ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-blue-600' 
                      : 'text-white hover:text-blue-200'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${isScrolled ? 'bg-blue-600' : 'bg-gray-200'}`} />
                </a>
              ))}
            </div>

            {/* Language Selector & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsLangMenuOpen(prev => !prev);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors hover:bg-white/10 language-selector ${isScrolled ? 'border-gray-300 text-gray-700' : 'border-white/30 text-white'}`}
                  aria-label="Select language"
                >
                  <Globe className="w-4 h-4" />
                  {selectedLang && (
                    <>
                      <span className="hidden sm:inline">{selectedLang.flag}</span>
                      <span className="text-sm">{selectedLang.code.toUpperCase()}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                className={`lg:hidden p-2 rounded-lg transition-colors hover:bg-white/10 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              {/* CTA Button (Desktop) */}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick('#contact', e)}
                className="hidden lg:block bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                Get Quote
              </a>
            </div>
          </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div 
            className={`absolute top-0 right-0 bottom-0 w-80 !bg-white shadow-2xl transition-transform duration-300 overflow-y-auto ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ backgroundColor: '#ffffff', opacity: 1 }}
          >
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-6 pt-24">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(link.href, e)}
                    className="text-gray-700 hover:text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick('#contact', e)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full mt-4 shadow-lg text-center"
                >
                  Get Free Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Language Dropdown */}
      {isLangMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsLangMenuOpen(false)}
          />
          <div 
            className="fixed bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden min-w-[180px] z-50"
            style={langDropdownStyle}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLanguageSelect(lang);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  selectedLang?.code === lang.code 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-sm">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}
