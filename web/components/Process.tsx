import { MessageSquare, Calendar, Plane, Smile } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Free Consultation',
    description: 'Contact us for a free online consultation and treatment plan',
    number: '01',
  },
  {
    icon: Calendar,
    title: 'Schedule Visit',
    description: 'We help you plan your trip and book appointments',
    number: '02',
  },
  {
    icon: Plane,
    title: 'Arrive & Relax',
    description: 'We arrange pickup, accommodation, and all logistics',
    number: '03',
  },
  {
    icon: Smile,
    title: 'Get Treatment',
    description: 'Receive world-class dental care and enjoy your new smile',
    number: '04',
  },
];

export function Process() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Animated background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl animate-pulse-slow" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="mb-4">Simple Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From consultation to your new smile - we make dental tourism easy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-center">
                {/* Number badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl mb-6 relative z-10 shadow-lg animate-scale-in" style={{ animationDelay: `${index * 150 + 300}ms` }}>
                  <span className="text-xl">{step.number}</span>
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-4 transition-transform duration-300 hover:rotate-12 hover:scale-110">
                  <step.icon className="w-7 h-7 text-blue-600" />
                </div>

                <h3 className="mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>

              {/* Animated arrow (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 -right-4 transform -translate-y-1/2 animate-fade-in-right" style={{ animationDelay: `${index * 150 + 500}ms` }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
