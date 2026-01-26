import { motion } from 'framer-motion';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { FAQItem as FAQItemType } from '../types/Course';
import FAQItem from './FAQItem';

interface FAQProps {
  items: FAQItemType[];
}

const FAQ = ({ items }: FAQProps) => {
  return (
    <section id="faq" className="py-24 bg-surface">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border mb-6">
            <HelpCircle className="w-4 h-4 text-accent" />
            <span className="label-uppercase text-text-secondary">Perguntas Frequentes</span>
          </div>
          <h2 className="heading-xl mb-6">
            <span className="text-text-primary">Tire suas</span>
            <br />
            <span className="gradient-text italic">dúvidas</span>
          </h2>
          <p className="text-body-light text-text-secondary max-w-xl mx-auto">
            Respostas para as perguntas mais comuns sobre nossos cursos
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {items.map((item, index) => (
            <FAQItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-text-secondary mb-6">Ainda tem dúvidas?</p>
          <button
            onClick={() => {
              const element = document.getElementById('inscricao');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary group"
          >
            Entre em Contato
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
