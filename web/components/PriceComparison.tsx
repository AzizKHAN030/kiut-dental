import { Check, TrendingDown } from 'lucide-react';

const services = [
  {
    name: 'Dental Implant (per tooth)',
    usa: '$3,500',
    uk: '£2,500',
    uzbekistan: '$800',
    savings: '77%',
  },
  {
    name: 'Porcelain Veneers (per tooth)',
    usa: '$1,200',
    uk: '£900',
    uzbekistan: '$300',
    savings: '75%',
  },
  {
    name: 'Teeth Whitening',
    usa: '$500',
    uk: '£400',
    uzbekistan: '$150',
    savings: '70%',
  },
  {
    name: 'Root Canal Treatment',
    usa: '$1,000',
    uk: '£700',
    uzbekistan: '$120',
    savings: '88%',
  },
  {
    name: 'Dental Crown',
    usa: '$1,400',
    uk: '£1,000',
    uzbekistan: '$250',
    savings: '82%',
  },
  {
    name: 'Full Mouth Reconstruction',
    usa: '$40,000',
    uk: '£30,000',
    uzbekistan: '$8,500',
    savings: '79%',
  },
];

export function PriceComparison() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="mb-4">Price Comparison</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how much you can save with dental treatments in Uzbekistan
          </p>
        </div>

        <div className="max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                  <th className="text-left p-6">Treatment</th>
                  <th className="text-center p-6">USA</th>
                  <th className="text-center p-6">UK</th>
                  <th className="text-center p-6 bg-green-500">
                    <div className="flex items-center justify-center gap-2">
                      <span>Uzbekistan</span>
                      <Check className="w-5 h-5" />
                    </div>
                  </th>
                  <th className="text-center p-6">You Save</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr
                    key={service.name}
                    className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors animate-fade-in-left"
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                    <td className="p-6">{service.name}</td>
                    <td className="text-center p-6 text-gray-600">{service.usa}</td>
                    <td className="text-center p-6 text-gray-600">{service.uk}</td>
                    <td className="text-center p-6 bg-green-50">
                      <span className="text-green-700 font-semibold">{service.uzbekistan}</span>
                    </td>
                    <td className="text-center p-6">
                      <div className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm">
                        <TrendingDown className="w-4 h-4" />
                        {service.savings}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {services.map((service, index) => (
              <div
                key={service.name}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">
                  <h3 className="mb-2">{service.name}</h3>
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm">
                    <TrendingDown className="w-4 h-4" />
                    Save {service.savings}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">USA</div>
                    <div className="text-gray-700">{service.usa}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">UK</div>
                    <div className="text-gray-700">{service.uk}</div>
                  </div>
                  <div className="text-center bg-green-50 rounded-lg p-2">
                    <div className="text-xs text-gray-500 mb-1">Uzbekistan</div>
                    <div className="text-green-700 font-semibold">{service.uzbekistan}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-gray-900 mb-2">All-Inclusive Packages Available</h4>
                <p className="text-gray-600 text-sm">
                  Prices include consultation, treatment, and follow-up care. We also offer package deals that include accommodation and airport transfers for international patients. Even with travel costs, you'll still save significantly compared to treatment in the USA or UK.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
