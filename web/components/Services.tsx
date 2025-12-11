import { Smile, Zap, Crown, Sparkles, Clock } from 'lucide-react';

const services = [
  {
    icon: Smile,
    title: 'Teeth Whitening',
    description: 'Professional whitening for a brighter smile',
    price: '$150',
    originalPrice: '$500',
    duration: '1-2 hours',
  },
  {
    icon: Crown,
    title: 'Dental Implants',
    description: 'Permanent solution for missing teeth',
    price: '$800',
    originalPrice: '$3,500',
    duration: '2-3 days',
  },
  {
    icon: Sparkles,
    title: 'Veneers',
    description: 'Transform your smile with porcelain veneers',
    price: '$300',
    originalPrice: '$1,200',
    duration: '2-3 days',
  },
  {
    icon: Zap,
    title: 'Root Canal',
    description: 'Pain-free root canal treatment',
    price: '$120',
    originalPrice: '$800',
    duration: '1 day',
  },
];

export function Services() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="mb-4">Popular Treatments</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Compare our prices with Western countries and see the difference
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const savings = Math.round(
              (1 - parseInt(service.price.replace('$', '')) / parseInt(service.originalPrice.replace('$', ''))) * 100
            );
            
            return (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group animate-fade-in-up hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-12">
                    <service.icon className="w-6 h-6 text-blue-600" />
                  </div>

                  <h3 className="mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                  {/* Price */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-blue-600">{service.price}</span>
                      <span className="text-gray-400 line-through text-sm">{service.originalPrice}</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {service.duration}
                  </div>
                </div>

                {/* Savings badge */}
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-scale-in">
                  Save {savings}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
