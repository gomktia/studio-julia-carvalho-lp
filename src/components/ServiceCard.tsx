import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  category: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  onSchedule: (serviceName: string) => void;
}

const ServiceCard = ({ service, index, onSchedule }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="card-elevated p-6 flex flex-col h-full group"
    >
      <div className="flex flex-col flex-grow">
        <span className="label-uppercase text-accent text-[10px] mb-3">
          {service.category || 'Estética'}
        </span>

        <h3 className="font-display text-xl text-text-primary mb-2 group-hover:text-accent transition-colors">
          {service.name}
        </h3>

        <p className="text-body-light text-text-secondary text-sm mb-4 flex-grow line-clamp-3">
          {service.description}
        </p>

        <div className="flex items-center gap-2 text-text-tertiary mb-4">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{service.duration_minutes} min</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-body-black text-xl text-text-primary">
            R$ {service.price.toFixed(2).replace('.', ',')}
          </span>

          <button
            onClick={() => onSchedule(service.name)}
            className="btn-secondary text-xs px-4 py-2 group/btn"
          >
            Agendar
            <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
