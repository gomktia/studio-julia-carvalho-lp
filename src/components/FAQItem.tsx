import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQItem as FAQItemType } from '../types/Course';

interface FAQItemProps {
  item: FAQItemType;
  index: number;
}

const FAQItem = ({ item, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen ? 'bg-surface-elevated border-accent/20' : 'bg-surface border-border'
      } border`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left group"
      >
        <span className={`font-medium transition-colors pr-4 ${
          isOpen ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'
        }`}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className={`w-5 h-5 transition-colors ${
            isOpen ? 'text-accent' : 'text-text-tertiary'
          }`} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-0">
              <p className="text-body-light text-text-secondary leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;
