import { 
  CalendarCheck, 
  PlaneTakeoff, 
  Car, 
  Hotel, 
  FileText, 
  Headphones,
  Languages,
  MapPin,
  Coffee,
  Camera
} from 'lucide-react';

const services = [
  {
    icon: CalendarCheck,
    title: 'Booking Consultancy',
    description: 'Expert assistance in scheduling appointments and planning your treatment timeline',
    color: 'from-blue-500 to-blue-600',
    included: true,
  },
  {
    icon: PlaneTakeoff,
    title: 'Airport Transfer',
    description: 'Comfortable pickup service from Tashkent International Airport to your hotel',
    color: 'from-purple-500 to-purple-600',
    included: true,
  },
  {
    icon: Car,
    title: 'Hospital Transportation',
    description: 'Daily transfers between your hotel and our dental clinic',
    color: 'from-cyan-500 to-cyan-600',
    included: true,
  },
  {
    icon: Hotel,
    title: 'Accommodation Assistance',
    description: 'Help booking comfortable hotels near the clinic at discounted rates',
    color: 'from-pink-500 to-pink-600',
    included: false,
  },
  {
    icon: FileText,
    title: 'Visa Support',
    description: 'Guidance and invitation letters for your visa application process',
    color: 'from-orange-500 to-orange-600',
    included: true,
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock assistance in English, Russian, and German',
    color: 'from-green-500 to-green-600',
    included: true,
  },
  {
    icon: Languages,
    title: 'Translation Services',
    description: 'Professional interpreters during consultations and treatment',
    color: 'from-indigo-500 to-indigo-600',
    included: true,
  },
  {
    icon: MapPin,
    title: 'City Tours',
    description: 'Guided tours of Tashkent and nearby historic Silk Road cities',
    color: 'from-teal-500 to-teal-600',
    included: false,
  },
  {
    icon: Coffee,
    title: 'Recovery Lounge',
    description: 'Comfortable post-treatment rest area with refreshments',
    color: 'from-amber-500 to-amber-600',
    included: true,
  },
  {
    icon: Camera,
    title: 'Tourism Recommendations',
    description: 'Curated list of must-visit places and local experiences',
    color: 'from-rose-500 to-rose-600',
    included: true,
  },
];

export function AdditionalServices() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse-slow" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full mb-6">
            <span>Complete Care Package</span>
          </div>
          
          <h2 className="mb-4">Additional Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We take care of everything beyond your dental treatment - making your medical tourism experience seamless and enjoyable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="relative group animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 h-full hover:-translate-y-2 hover:scale-102">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-12`}
                >
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-base">{service.title}</h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                {/* Badge */}
                {service.included ? (
                  <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Included
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    Available
                  </div>
                )}

                {/* Decorative gradient on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl animate-fade-in-left" style={{ animationDelay: '600ms' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <PlaneTakeoff className="w-6 h-6" />
              </div>
              <div>
                <h3 className="mb-2 text-white">All-Inclusive Packages</h3>
                <p className="text-blue-100 text-sm">
                  Choose our complete package that includes treatment, accommodation, transfers, and guided tours for a worry-free experience.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl animate-fade-in-right" style={{ animationDelay: '600ms' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h3 className="mb-2 text-white">Personalized Coordinator</h3>
                <p className="text-purple-100 text-sm">
                  Every patient gets a dedicated coordinator who speaks your language and handles all logistics from start to finish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
