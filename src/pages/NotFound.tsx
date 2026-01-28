import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Editorial Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-50/50 rounded-full blur-[100px] -ml-32 -mb-32" />
      </div>

      <div className="max-w-xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
        >
          <span className="text-[15vw] font-display text-accent/10 italic leading-none block mb-4">404</span>

          <h1 className="heading-xl mb-6">
            <span className="text-text-primary">Página não </span>
            <span className="gradient-text italic">encontrada</span>
          </h1>

          <p className="text-text-secondary text-lg font-light leading-relaxed mb-12 italic opacity-80">
            "A beleza está nos detalhes, mas parece que este detalhe se perdeu no caminho."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="group px-8 py-4 bg-text-primary text-white rounded-2xl font-medium transition-all hover:bg-black flex items-center gap-2 shadow-xl shadow-black/10 hover:shadow-black/20"
            >
              <Home className="w-4 h-4" />
              Voltar ao Início
            </button>

            <button
              onClick={() => navigate(-1)}
              className="group px-8 py-4 bg-transparent border border-border text-text-secondary rounded-2xl font-medium transition-all hover:bg-base flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Página Anterior
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
