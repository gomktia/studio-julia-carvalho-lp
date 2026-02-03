import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types/Course';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  return (
    <section id="depoimentos" className="py-24 bg-white relative overflow-hidden">
      {/* Editorial Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-r from-accent/10 to-transparent rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 p-32">
          <Quote className="w-64 h-64 text-accent/5 -rotate-12" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-4 block">Testemunhos</span>
          <h2 className="heading-xl mb-6">
            <span className="text-text-primary italic">Histórias</span>
            <span className="text-text-primary"> de sucesso</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto font-light leading-relaxed">
            Descubra como nossas alunas transformaram suas carreiras e conquistaram a independência financeira.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
              className="bg-surface border border-border/40 p-10 rounded-[3rem] relative shadow-sm hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className="absolute top-8 right-10 text-accent/20 group-hover:text-accent/40 transition-colors">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-accent" fill="currentColor" />
                ))}
              </div>

              {/* Content */}
              <p className="text-lg text-text-primary mb-10 leading-relaxed font-light italic opacity-90">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-8 border-t border-border/30">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-rose-400 flex items-center justify-center text-white font-display text-xl shadow-lg shadow-accent/20">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-display text-lg text-text-primary mb-0.5">{testimonial.name}</div>
                  <div className="text-[10px] font-bold text-accent uppercase tracking-widest">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-3xl border border-border/50 bg-white shadow-xl shadow-black/[0.02]">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-accent/10 flex items-center justify-center">
                  <Star className="w-3 h-3 text-accent" fill="currentColor" />
                </div>
              ))}
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="text-xs text-text-secondary tracking-wide">
              Média de <span className="text-text-primary font-bold">4.9/5.0</span> estrelas por alunas reais
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


export default Testimonials;
