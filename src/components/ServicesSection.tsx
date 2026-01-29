import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import ServiceCard from './ServiceCard';
import SkeletonLoader from './SkeletonLoader';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  category: string;
  image?: string;
}

const getServiceImage = (name: string) => {
  const normalized = name.toLowerCase();
  if (normalized.includes('limpeza de pele')) return '/assets/limpeza-pele-profunda.jpeg';
  if (normalized.includes('microagulhamento')) return '/assets/microagulhamento.jpeg';
  if (normalized.includes('design de sobrancelha')) return '/assets/design-sobrancelha.jpeg';
  if (normalized.includes('brow lamination')) return '/assets/brow-lamination.jpeg';
  if (normalized.includes('lash lifting')) return '/assets/lash-lifting.jpeg';
  if (normalized.includes('labial')) return '/assets/micropigmentacao-labial.jpeg';
  if (normalized.includes('fio a fio')) return '/assets/micropigmentacao-fio-a-fio.jpeg';
  if (normalized.includes('shadow')) return '/assets/micropigmentacao-shadow.jpeg';
  if (normalized.includes('cílios') || normalized.includes('cilios')) return '/assets/cilios.jpeg';
  return '/assets/placeholder.svg';
};

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('name');

    if (data) {
      setServices(
        data.map((s) => ({
          id: s.id,
          name: s.name,
          description: s.description || '',
          price: Number(s.price),
          duration_minutes: s.duration_minutes,
          category: s.category || 'Estética',
          image: getServiceImage(s.name),
        }))
      );
    }
    setIsLoading(false);
  };

  const handleSchedule = (serviceName: string) => {
    const message = encodeURIComponent(`Olá! Gostaria de agendar o serviço: ${serviceName}`);
    window.open(`https://wa.me/5511933300012?text=${message}`, '_blank');
  };

  return (
    <section id="servicos" className="py-24 bg-base">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="label-uppercase text-accent mb-4 block">Nossos Serviços</span>
          <h2 className="heading-xl mb-6">
            <span className="text-text-primary">Serviços </span>
            <span className="gradient-text italic">individuais</span>
          </h2>
          <p className="text-body-light text-text-secondary max-w-xl mx-auto">
            Conheça todos os nossos serviços de estética e beleza com atendimento personalizado
          </p>
        </motion.div>

        {isLoading ? (
          <SkeletonLoader count={4} />
        ) : services.length === 0 ? (
          <p className="text-center text-text-tertiary">Nenhum serviço disponível no momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                onSchedule={handleSchedule}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
