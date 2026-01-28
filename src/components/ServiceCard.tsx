import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  category: string;
  image?: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  onSchedule: (serviceName: string) => void;
}

const ServiceCard = ({ service, index, onSchedule }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.21, 0.45, 0.32, 0.9] }}
      className="group relative h-full"
    >
      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-full flex flex-col bg-white border border-border/50 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-2 p-2">
        {/* Content Wrapper */}
        <div className="flex flex-col h-full bg-surface rounded-[2rem] border border-border/30 overflow-hidden">

          <div className="relative h-56 overflow-hidden">
            <img
              src={service.image || '/assets/placeholder.svg'}
              alt={service.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase">
                {service.category || 'Estética'}
              </span>
            </div>

            {/* Time Badge - Float on Image */}
            <div className="absolute bottom-6 left-6">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md text-white/90 text-[10px] font-medium border border-white/10">
                <Clock className="w-3 h-3" />
                {service.duration_minutes} min
              </div>
            </div>
          </div>

          <div className="p-8 flex flex-col flex-grow">
            <h3 className="font-display text-2xl text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
              {service.name}
            </h3>

            <p className="text-text-secondary text-sm leading-relaxed mb-8 font-light opacity-80 flex-grow line-clamp-3">
              {service.description}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-border/50">
              <div className="flex flex-col">
                <span className="text-[10px] text-text-tertiary uppercase tracking-widest font-bold">Investimento</span>
                <span className="text-2xl font-display text-text-primary">
                  R$ {service.price.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <button
                onClick={() => onSchedule(service.name)}
                className="relative group/btn overflow-hidden px-6 py-2.5 rounded-xl bg-text-primary text-white font-medium text-xs transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Agendar
                  <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-rose-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


export default ServiceCard;
