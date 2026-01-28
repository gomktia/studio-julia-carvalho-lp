import { motion } from 'framer-motion';
import { Check, Clock, ArrowRight } from 'lucide-react';
import { Course } from '../types/Course';

interface CourseCardProps {
  course: Course;
  index: number;
  onEnroll: (courseId: string) => void;
}

const CourseCard = ({ course, index, onEnroll }: CourseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
      className="group relative h-full"
    >
      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-full flex flex-col bg-white border border-border/50 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-2 p-2">
        {/* Content Wrapper */}
        <div className="flex flex-col h-full bg-surface rounded-[2rem] border border-border/30 overflow-hidden">

          {/* Image Section */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase">
                {course.category}
              </span>
            </div>

            {/* Time Badge */}
            <div className="absolute top-6 right-6">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md text-white/90 text-[10px] font-medium border border-white/10">
                <Clock className="w-3 h-3" />
                {course.duration}
              </div>
            </div>

            {/* Float Pricing inside Image */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-rose-300 uppercase tracking-tighter mb-1">Presencial</span>
                <span className="text-2xl font-display text-white">R$ {course.price.toLocaleString('pt-BR')}</span>
              </div>

              <div className="bg-rose-500 px-3 py-2 rounded-xl border border-white/20 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="block text-[8px] font-black text-rose-100 uppercase tracking-widest">Online (Promo)</span>
                <span className="text-lg font-bold text-white leading-none">R$ 299</span>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="p-8 flex flex-col flex-1">
            <h3 className="font-display text-2xl text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
              {course.title}
            </h3>

            <p className="text-text-secondary text-sm leading-relaxed mb-6 font-light opacity-80 flex-1">
              {course.description}
            </p>

            {/* Features Preview */}
            <div className="space-y-3 mb-8">
              {course.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 group/feat">
                  <div className="w-5 h-5 rounded-full bg-accent/5 flex items-center justify-center border border-accent/10 group-hover/feat:bg-accent transition-colors">
                    <Check className="w-3 h-3 text-accent group-hover/feat:text-white transition-colors" />
                  </div>
                  <span className="text-xs text-text-secondary group-hover/feat:text-text-primary transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => onEnroll(course.id)}
              className="w-full relative group/btn overflow-hidden h-14 rounded-2xl bg-text-primary text-white font-medium text-sm transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Começar agora
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-rose-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </button>

            <p className="text-center mt-4 text-[10px] text-text-tertiary uppercase tracking-widest font-medium">
              Certificado Incluso
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


export default CourseCard;
