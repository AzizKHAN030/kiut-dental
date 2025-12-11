import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import { HeroButtons } from './HeroButtons';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-fade-in-left">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Sparkles className="w-4 h-4" />
              <span>Premium Dental Care from Uzbekistan</span>
            </div>

            <h1 className="mb-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              World-Class Smiles at{' '}
              <span className="text-blue-600 relative inline-block">
                Half the Price
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <path
                    d="M0 4C50 2, 150 6, 200 4"
                    stroke="#2563eb"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="animate-draw-line"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-gray-600 mb-8 max-w-lg animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              Experience premium dental treatments in Uzbekistan. Save up to 70% compared to Western countries while receiving world-class care from internationally trained specialists.
            </p>

            <HeroButtons />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
              <div>
                <div className="text-blue-600 mb-1 text-2xl font-semibold">70%</div>
                <div className="text-gray-600 text-sm">Cost Savings</div>
              </div>
              <div>
                <div className="text-blue-600 mb-1 text-2xl font-semibold">15K+</div>
                <div className="text-gray-600 text-sm">Happy Patients</div>
              </div>
              <div>
                <div className="text-blue-600 mb-1 text-2xl font-semibold">24/7</div>
                <div className="text-gray-600 text-sm">Support</div>
              </div>
            </div>
          </div>

          {/* Right content - Image with animated elements */}
          <div className="relative animate-fade-in-right">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-102 aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1764004450351-37fb72cb8e8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBtb2Rlcm58ZW58MXx8fHwxNzY1MTE5NTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern dental clinic in Uzbekistan"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 animate-scale-in" style={{ animationDelay: '1200ms' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-900 font-semibold">ISO Certified</div>
                  <div className="text-sm text-gray-500">International Standards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
