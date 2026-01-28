import { motion } from 'framer-motion';
import { Award, Heart, Sparkles, Users, ArrowRight } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { icon: Award, value: '500+', label: 'Alunas Formadas' },
    { icon: Users, value: '10+', label: 'Anos de Experiência' },
    { icon: Sparkles, value: '100%', label: 'Prática Supervisionada' },
    { icon: Heart, value: '5.0', label: 'Avaliação Média' },
  ];

  return (
    <section id="sobre" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden">
                <img
                  src="/assets/ju-carvalho.jpg"
                  alt="Júlia Carvalho - Instrutora Estudio Júlia Carvalho"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-6 card-elevated px-6 py-4"
              >
                <div className="text-body-black text-2xl gradient-text">10+</div>
                <div className="text-xs text-text-tertiary">Anos de experiência</div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-accent/20 rounded-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="label-uppercase text-accent mb-4 block">Sobre a Instrutora</span>

            <h2 className="heading-xl mb-6">
              <span className="gradient-text italic">Júlia Carvalho</span>
            </h2>

            <div className="space-y-4 mb-10">
              <p className="text-body-light text-text-secondary leading-relaxed">
                Profissional renomada na área de estética facial e micropigmentação, com anos de experiência
                transformando vidas através da beleza e autoestima. Especialista em técnicas avançadas de
                estética, Ju acredita que cada aluna merece uma formação completa e humanizada.
              </p>

              <p className="text-body-light text-text-secondary leading-relaxed">
                No Estudio Júlia Carvalho, a missão é formar profissionais técnicas e confiantes, preparadas
                para entregar resultados excepcionais e construir carreiras de sucesso no mercado de beleza.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-4 rounded-xl border border-border hover:border-accent/30 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <stat.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-body-black text-xl text-text-primary">{stat.value}</div>
                      <div className="text-xs text-text-tertiary">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              onClick={() => {
                const element = document.getElementById('cursos');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary group"
            >
              Conheça Nossos Cursos
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
