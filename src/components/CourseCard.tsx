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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group card-elevated overflow-hidden h-full flex flex-col"
    >
      {/* Course Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="label-uppercase px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-text-secondary border border-white/50">
            {course.category}
          </span>
        </div>

        {/* Price Tags */}
        <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
          <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-rose-500/30 text-right shadow-lg">
            <div className="text-[10px] text-rose-300 uppercase font-bold tracking-wider mb-0.5">Online (Pré-venda)</div>
            <div className="text-lg font-bold text-white leading-none">R$ 299</div>
          </div>

          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/50 text-right shadow-xl">
            <div className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mb-0.5">Presencial</div>
            <div className="text-xl font-bold text-accent leading-none">R$ {course.price.toLocaleString('pt-BR')}</div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-display text-2xl text-text-primary mb-3 group-hover:text-accent transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-body-light text-text-secondary text-sm mb-6 line-clamp-3">
          {course.description}
        </p>

        {/* Duration */}
        <div className="flex items-center gap-2 text-text-tertiary mb-6">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{course.duration}</span>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8 flex-1">
          {course.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-accent" />
              </div>
              <span className="text-sm text-text-secondary">{feature}</span>
            </div>
          ))}
          {course.features.length > 3 && (
            <div className="text-sm text-accent font-medium pl-8">
              +{course.features.length - 3} benefícios inclusos
            </div>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onEnroll(course.id)}
          className="w-full btn-primary group/btn"
        >
          Garantir Minha Vaga
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </button>

        {/* Urgency Badge */}
        <div className="text-center mt-4">
          <span className="text-xs text-text-tertiary">
            Turmas com vagas limitadas
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
