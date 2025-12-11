import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    country: 'United Kingdom',
    treatment: 'Dental Implants',
    rating: 5,
    text: 'I saved over £5,000 on my dental implants! The quality of care was exceptional, and the doctors were incredibly professional. Highly recommend!',
    image: 'https://images.unsplash.com/photo-1684607631635-44399dee5ac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwcGF0aWVudCUyMGhhcHB5fGVufDF8fHx8MTc2NTIxMjYyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'Michael Chen',
    country: 'United States',
    treatment: 'Full Smile Makeover',
    rating: 5,
    text: 'The entire experience was seamless. From booking to aftercare, everything was handled professionally. Plus, I got to explore beautiful Uzbekistan!',
    image: 'https://images.unsplash.com/photo-1684607631635-44399dee5ac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwcGF0aWVudCUyMGhhcHB5fGVufDF8fHx8MTc2NTIxMjYyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'Emma Schmidt',
    country: 'Germany',
    treatment: 'Veneers',
    rating: 5,
    text: 'Best decision ever! The veneers look natural and beautiful. The clinic was modern, clean, and the staff spoke perfect English.',
    image: 'https://images.unsplash.com/photo-1684607631635-44399dee5ac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwcGF0aWVudCUyMGhhcHB5fGVufDF8fHx8MTc2NTIxMjYyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="mb-4">What Our Patients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied international patients who transformed their smiles
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative animate-fade-in-up hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-blue-100 animate-rotate-slow">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-gray-900 font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.country}</div>
                </div>
              </div>

              {/* Treatment badge */}
              <div className="absolute top-6 left-6 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                {testimonial.treatment}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
