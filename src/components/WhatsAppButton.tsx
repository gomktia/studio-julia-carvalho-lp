import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '5511933300012';
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os cursos do Estudio Júlia Carvalho.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full shadow-lg flex items-center justify-center transition-colors"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />

      {/* Subtle pulse ring */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-30" />
    </motion.button>
  );
};

export default WhatsAppButton;
