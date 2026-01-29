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
      {/* Background Image Optimized for LCP */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/hero-julia.jpg"
          alt="Júlia Carvalho"
          className="w-full h-full object-cover object-[center_top] animate-hero-zoom"
          fetchPriority="high"
          decoding="async"
        />
        {/* Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

        {/* Gradient Overlay for bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 sm:py-40 flex flex-col items-center text-center">
        <div className="max-w-5xl">
          {/* Badge */}


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
            className="text-white text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16">
              <div>
                <div className="text-4xl sm:text-4xl text-white font-serif mb-1">6+</div>
                <div className="text-[10px] sm:text-sm text-white uppercase tracking-[0.2em] sm:tracking-widest opacity-70 sm:opacity-100">Cursos Especializados</div>
              </div>
              <div>
                <div className="text-4xl sm:text-4xl text-white font-serif mb-1">500+</div>
                <div className="text-[10px] sm:text-sm text-white uppercase tracking-[0.2em] sm:tracking-widest opacity-70 sm:opacity-100">Alunas Formadas</div>
              </div>
              <div>
                <div className="text-4xl sm:text-4xl text-rose-300 font-serif mb-1">100%</div>
                <div className="text-[10px] sm:text-sm text-white uppercase tracking-[0.2em] sm:tracking-widest opacity-70 sm:opacity-100">Prática Supervisionada</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  );
};

export default Hero;
