import { DollarSign, Clock, Award, Plane, Shield, Stethoscope } from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: 'Save up to 70%',
    description: 'Significantly lower costs compared to US, UK, and EU prices without compromising quality.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Clock,
    title: 'Fast Treatment',
    description: 'No waiting lists. Get your treatment scheduled within days, not months.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Award,
    title: 'Expert Specialists',
    description: 'Internationally trained dentists with European and American certifications.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Plane,
    title: 'Travel Assistance',
    description: 'We help arrange your trip, accommodation, and local transportation.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: 'International standards with modern equipment and premium materials.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Stethoscope,
    title: 'Full Care Package',
    description: 'Complete treatment plan including follow-ups and aftercare support.',
    color: 'from-teal-500 to-cyan-500',
  },
];

export function Benefits() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="mb-4">Why Choose Uzbekistan?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the advantages of dental tourism in Uzbekistan - where quality meets affordability
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="relative group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110`}
                >
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>

                {/* Decorative gradient on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
