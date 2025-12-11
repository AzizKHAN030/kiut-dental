import { CTAContent } from './CTAContent';
import { CTAForm } from './CTAForm';

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left content */}
          <CTAContent />

          {/* Right content - Contact Form */}
          <div className="animate-fade-in-right">
            <CTAForm />
          </div>
        </div>
      </div>
    </section>
  );
}
