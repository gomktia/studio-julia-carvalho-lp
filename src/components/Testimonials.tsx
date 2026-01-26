import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types/Course';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  return (
    <section id="depoimentos" className="py-24 bg-base relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-r from-rose-100/40 to-pink-100/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="label-uppercase text-accent mb-4 block">Depoimentos</span>
          <h2 className="heading-xl mb-6">
            <span className="text-text-primary">O que dizem</span>
            <br />
            <span className="gradient-text italic">nossas alunas</span>
          </h2>
          <p className="text-body-light text-text-secondary max-w-xl mx-auto">
            Histórias reais de transformação e sucesso profissional
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-elevated p-8 relative group"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-border">
                <Quote className="w-10 h-10" fill="currentColor" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent" fill="currentColor" />
                ))}
              </div>

              {/* Content */}
              <p className="text-body-light text-text-secondary mb-8 leading-relaxed relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-white font-display text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-text-primary">{testimonial.name}</div>
                  <div className="text-sm text-text-tertiary">{testimonial.role}</div>
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
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-surface">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-accent" fill="currentColor" />
              ))}
            </div>
            <span className="text-sm text-text-secondary">
              <span className="text-text-primary font-medium">4.9/5</span> baseado em 200+ avaliações
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
