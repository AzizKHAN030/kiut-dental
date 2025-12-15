import { Check, TrendingDown } from 'lucide-react';

interface CountryReference {
  code: string;
  name: string;
}

interface CountryPrice {
  country: CountryReference;
  price: string;
}

interface Treatment {
  nameSource?: 'predefined' | 'custom';
  treatment?: {
    _id: string;
    name: string;
    slug?: {
      current: string;
    };
  };
  customName?: string;
  prices: CountryPrice[];
}

interface CountryWithHighlight {
  country: {
    name: string;
    code: string;
    flag?: string;
  };
  isHighlighted?: boolean;
}

interface FooterNote {
  title?: string;
  description?: string;
}

interface PriceComparisonData {
  _type: string;
  title?: string;
  subtitle?: string;
  countries?: CountryWithHighlight[];
  treatments?: Treatment[];
  baseCountry?: {
    code: string;
    name: string;
  };
  footerNotes?: FooterNote[];
}

interface PriceComparisonProps {
  data?: PriceComparisonData | null;
}

export function PriceComparison({ data }: PriceComparisonProps) {
  // Return null if no data
  if (!data || !data.countries || !data.treatments || data.countries.length === 0 || data.treatments.length === 0) {
    return null;
  }

  const { title, subtitle, countries, treatments, baseCountry, footerNotes } = data;

  // Helper function to get treatment display name
  const getTreatmentName = (treatment: Treatment): string => {
    if (treatment.nameSource === 'predefined' && treatment.treatment?.name) {
      return treatment.treatment.name;
    }
    if (treatment.nameSource === 'custom' && treatment.customName) {
      return treatment.customName;
    }
    // Fallback for backward compatibility (if nameSource is not set)
    return treatment.treatment?.name || treatment.customName || 'Unnamed treatment';
  };

  // Helper function to extract numeric value from price string
  const extractNumericValue = (price: string): number => {
    // Remove all non-numeric characters except dots and commas
    // Then replace commas with nothing (for thousands separator)
    // Finally parse as float
    const numericString = price.replace(/[^\d.,]/g, '').replace(/,/g, '');
    return parseFloat(numericString) || 0;
  };

  // Helper function to get price for a specific country
  const getPriceForCountry = (treatment: Treatment, countryCode: string): CountryPrice | undefined => {
    return treatment.prices?.find(p => p.country?.code === countryCode);
  };

  // Calculate savings percentage
  const calculateSavings = (treatment: Treatment): string | null => {
    if (!baseCountry?.code) return null;

    const basePrice = getPriceForCountry(treatment, baseCountry.code);
    if (!basePrice) return null;

    // Find the highest price among other countries
    const otherPrices = treatment.prices?.filter(p => p.country?.code !== baseCountry.code) || [];
    if (otherPrices.length === 0) return null;

    const basePriceNumeric = extractNumericValue(basePrice.price);
    const maxPrice = Math.max(...otherPrices.map(p => extractNumericValue(p.price)));
    
    if (maxPrice <= 0 || basePriceNumeric <= 0) return null;

    const savingsPercent = Math.round((1 - basePriceNumeric / maxPrice) * 100);
    return savingsPercent > 0 ? `${savingsPercent}%` : null;
  };

  // Find highlighted country
  const highlightedCountry = countries.find(c => c.isHighlighted);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
        <div className="text-center mb-16 animate-fade-in-up">
            {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
            {subtitle && (
              <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
        </div>
        )}

        <div className="max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                  <th className="text-left p-6">Treatment</th>
                  {countries.map((countryItem) => (
                    <th
                      key={countryItem.country.code}
                      className={`text-center p-6 ${countryItem.isHighlighted ? 'bg-green-600' : ''}`}
                    >
                      {countryItem.isHighlighted ? (
                    <div className="flex items-center justify-center gap-2">
                          {countryItem.country.flag && <span>{countryItem.country.flag}</span>}
                          <span>{countryItem.country.name}</span>
                      <Check className="w-5 h-5" />
                    </div>
                      ) : (
                        <span>
                          {countryItem.country.flag && `${countryItem.country.flag} `}
                          {countryItem.country.name}
                        </span>
                      )}
                  </th>
                  ))}
                  {baseCountry && <th className="text-center p-6">You Save</th>}
                </tr>
              </thead>
              <tbody>
                {treatments.map((treatment, index) => {
                  const savings = calculateSavings(treatment);
                  const treatmentName = getTreatmentName(treatment);
                  
                  return (
                  <tr
                      key={`${treatmentName}-${index}`}
                    className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors animate-fade-in-left"
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                      <td className="p-6">{treatmentName}</td>
                      {countries.map((countryItem) => {
                        const priceData = getPriceForCountry(treatment, countryItem.country.code);
                        return (
                          <td
                            key={countryItem.country.code}
                            className={`text-center p-6 ${countryItem.isHighlighted ? 'bg-green-50' : ''}`}
                          >
                            {priceData ? (
                              <span className={countryItem.isHighlighted ? 'text-green-700 font-semibold' : 'text-gray-600'}>
                                {priceData.price}
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                    </td>
                        );
                      })}
                      {baseCountry && (
                    <td className="text-center p-6">
                          {savings ? (
                      <div className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm">
                        <TrendingDown className="w-4 h-4" />
                              {savings}
                      </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                    </td>
                      )}
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {treatments.map((treatment, index) => {
              const savings = calculateSavings(treatment);
              const treatmentName = getTreatmentName(treatment);
              
              return (
              <div
                  key={`${treatmentName}-${index}`}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">
                    <h3 className="mb-2">{treatmentName}</h3>
                    {savings && (
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm">
                    <TrendingDown className="w-4 h-4" />
                        Save {savings}
                      </div>
                    )}
                  </div>

                  <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${countries.length}, minmax(0, 1fr))` }}>
                    {countries.map((countryItem) => {
                      const priceData = getPriceForCountry(treatment, countryItem.country.code);
                      return (
                        <div
                          key={countryItem.country.code}
                          className={`text-center ${countryItem.isHighlighted ? 'bg-green-50 rounded-lg p-2' : ''}`}
                        >
                          <div className="text-xs text-gray-500 mb-1">
                            {countryItem.country.flag && `${countryItem.country.flag} `}
                            {countryItem.country.name}
                </div>
                          {priceData ? (
                            <div className={countryItem.isHighlighted ? 'text-green-700 font-semibold' : 'text-gray-700'}>
                              {priceData.price}
                  </div>
                          ) : (
                            <div className="text-gray-400">-</div>
                          )}
                  </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Notes */}
          {footerNotes && footerNotes.length > 0 && (
            <div className="mt-8 space-y-4">
              {footerNotes.map((note, index) => {
                if (!note.title && !note.description) return null;
                
                return (
                  <div 
                    key={index}
                    className="p-6 bg-blue-50 rounded-xl border border-blue-100 animate-fade-in-up" 
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                        {note.title && (
                          <h3 className="text-gray-900 mb-2 text-lg font-semibold">{note.title}</h3>
                        )}
                        {note.description && (
                          <p className="text-gray-600 text-sm">{note.description}</p>
                        )}
              </div>
            </div>
          </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
