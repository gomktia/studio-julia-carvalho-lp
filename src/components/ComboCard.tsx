import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { Combo } from '../types/Combo';

interface ComboCardProps {
  combo: Combo;
  index: number;
  onContact: () => void;
}

const ComboCard = ({ combo, index, onContact }: ComboCardProps) => {
  const savings = combo.originalPrice - combo.comboPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
      className="group relative h-full"
    >
      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-full flex flex-col bg-white border border-border/50 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-2 p-2">
        {/* Content Wrapper with Inner Padding */}
        <div className="flex flex-col h-full bg-surface rounded-[2rem] border border-border/30 overflow-hidden">

          {/* Header Card */}
          <div className="relative p-8 pb-6 overflow-hidden">
            {/* Background Blur Circle */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                {combo.discount && (
                  <span className="px-3 py-1 rounded-full bg-accent text-white text-[10px] font-bold tracking-widest uppercase">
                    {combo.discount} OFF
                  </span>
                )}
                {index === 1 && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold tracking-widest uppercase border border-emerald-500/20">
                    Mais Popular
                  </span>
                )}
              </div>

              <h3 className="font-display text-3xl text-text-primary mb-2 leading-tight">
                {combo.title}
              </h3>
              <p className="text-accent font-medium text-xs tracking-wide uppercase opacity-80">
                {combo.campaign}
              </p>
            </div>
          </div>

          <div className="px-8 flex flex-col flex-1">
            {/* Description */}
            <p className="text-text-secondary text-sm leading-relaxed mb-8 font-light italic opacity-80">
              "{combo.description}"
            </p>

            {/* Services List */}
            <div className="mb-8 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-xs font-bold text-text-primary tracking-widest uppercase">
                  O que está incluso
                </span>
              </div>

              <div className="space-y-4">
                {combo.services.map((service, idx) => (
                  <div key={idx} className="flex items-center justify-between group/item">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/5 flex items-center justify-center border border-accent/10 group-hover/item:bg-accent group-hover/item:border-accent transition-colors duration-300">
                        <Check className="w-3 h-3 text-accent group-hover/item:text-white transition-colors" />
                      </div>
                      <span className="text-sm text-text-secondary group-hover/item:text-text-primary transition-colors">
                        {service.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-text-tertiary font-medium">
                      R$ {service.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Section */}
            <div className="mt-auto pb-8">
              <div className="relative p-6 rounded-[1.5rem] bg-accent/5 border border-accent/10 overflow-hidden mb-6 group-hover:bg-accent/[0.08] transition-colors">
                {/* Savings Badge Floating */}
                <div className="absolute -top-2 -right-2 bg-white border border-accent/20 px-3 py-1.5 rounded-xl shadow-sm">
                  <span className="text-[10px] font-bold text-accent">
                    ECONOME R$ {savings}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-text-tertiary">
                    <span className="text-xs">De</span>
                    <span className="text-sm line-through decoration-accent/30">
                      R$ {combo.originalPrice.toLocaleString('pt-BR')}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-text-primary">Por</span>
                    <span className="text-4xl font-display text-text-primary">
                      R$ {combo.comboPrice.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>

                {combo.ideal && (
                  <div className="mt-4 pt-4 border-t border-accent/10">
                    <p className="text-[10px] leading-relaxed text-text-secondary">
                      <strong className="text-accent uppercase tracking-tighter mr-1">Ideal para:</strong>
                      {combo.ideal}
                    </p>
                  </div>
                )}
              </div>

              {/* Button */}
              <button
                onClick={onContact}
                className="w-full relative group/btn overflow-hidden h-14 rounded-2xl bg-text-primary text-white font-medium text-sm transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Garantir Oferta
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-rose-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </button>

              <p className="text-center mt-4 text-[10px] text-text-tertiary uppercase tracking-widest font-medium">
                Vagas limitadas por semana
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


export default ComboCard;
