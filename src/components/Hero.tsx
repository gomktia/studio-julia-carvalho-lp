import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-900">
      {/* Background Image with Parallax-like feel via absolute positioning */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/hero-julia.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Dark Overlay for contrast - increased opacity for better text readability over portrait */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

        {/* Gradient Overlay for bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 sm:py-40 flex flex-col items-center text-center">
        <div className="max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8"
          >
            <Sparkles className="w-4 h-4 text-rose-300" />
            <span className="label-uppercase text-white/90 tracking-wider">Formação Profissional em Estética</span>
          </motion.div>

          {/* Main Heading - Editorial Style */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="heading-display mb-8 text-4xl sm:text-6xl lg:text-7xl leading-tight"
          >
            <span className="text-white drop-shadow-sm">Transforme sua </span>
            <span className="text-rose-300 italic drop-shadow-sm">paixão</span>
            <span className="text-white drop-shadow-sm"> em profissão</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Cursos profissionais de estética com certificação, material completo
            e prática supervisionada. Aprenda com quem realmente entende do assunto.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <button
              onClick={() => scrollToSection('cursos')}
              className="group px-8 py-4 bg-white text-zinc-900 rounded-full font-medium transition-all hover:bg-rose-50 flex items-center gap-2"
            >
              Ver Cursos Disponíveis
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToSection('inscricao')}
              className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-medium transition-all hover:bg-white/10 hover:border-white/50"
            >
              Inscreva-se Agora
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 pt-12 border-t border-white/10"
          >
            <div className="grid grid-cols-3 gap-8 sm:gap-16">
              <div>
                <div className="text-3xl sm:text-4xl text-white font-serif mb-1">6+</div>
                <div className="text-sm text-white/60 uppercase tracking-widest">Cursos Especializados</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl text-white font-serif mb-1">500+</div>
                <div className="text-sm text-white/60 uppercase tracking-widest">Alunas Formadas</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl text-rose-300 font-serif mb-1">100%</div>
                <div className="text-sm text-white/60 uppercase tracking-widest">Prática Supervisionada</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2 backdrop-blur-sm"
        >
          <motion.div className="w-1 h-2 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
