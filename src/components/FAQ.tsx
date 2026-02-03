import { motion } from 'framer-motion';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { FAQItem as FAQItemType } from '../types/Course';
import FAQItem from './FAQItem';

interface FAQProps {
  items: FAQItemType[];
}

const FAQ = ({ items }: FAQProps) => {
  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-50/50 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-accent/10 mb-6">
            <HelpCircle className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">FAQ</span>
          </div>
          <h2 className="heading-xl mb-6">
            <span className="text-text-primary">Tire suas </span>
            <span className="gradient-text italic">dúvidas</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto font-light leading-relaxed">
            Preparamos as respostas para as perguntas mais frequentes para ajudar você em sua jornada.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <FAQItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-border/50 text-center"
        >
          <p className="text-text-secondary mb-8 font-light italic">Não encontrou o que procurava?</p>
          <button
            onClick={() => {
              const element = document.getElementById('inscricao');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-text-primary text-white rounded-2xl font-medium overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Falar com Especialista
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>
      </div>
    </section>

  );
};

export default FAQ;
