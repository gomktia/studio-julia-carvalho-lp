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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group card-elevated overflow-hidden h-full flex flex-col"
    >
      {/* Header with Campaign Badge */}
      <div className="relative p-6 bg-gradient-to-br from-accent to-accent/80">
        {combo.discount && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-base/80 backdrop-blur-sm">
            <span className="text-xs font-medium text-text-primary">{combo.discount}</span>
          </div>
        )}
        <h3 className="font-display text-2xl text-white mb-1">
          {combo.title}
        </h3>
        <p className="text-white/80 text-sm">{combo.campaign}</p>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-body-light text-text-secondary text-sm mb-6">
          {combo.description}
        </p>

        {/* Services Included */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-text-primary">Inclui:</span>
          </div>
          <div className="space-y-2">
            {combo.services.map((service, idx) => (
              <div key={idx} className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1">
                  <div className="w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-accent" />
                  </div>
                  <span className="text-sm text-text-secondary">{service.name}</span>
                </div>
                <span className="text-sm text-text-tertiary line-through">
                  R${service.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-auto">
          <div className="rounded-xl border border-border p-4 mb-4 bg-surface-elevated">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-tertiary">Valor individual:</span>
              <span className="text-text-tertiary line-through">
                R$ {combo.originalPrice.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-secondary">Valor no combo:</span>
              <span className="text-body-black text-2xl gradient-text">
                R$ {combo.comboPrice.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-sm text-success font-medium">
                Você economiza R$ {savings.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>

          {/* Ideal For */}
          {combo.ideal && (
            <div className="mb-4 p-3 rounded-lg border border-border">
              <p className="text-xs text-text-secondary">
                <span className="text-accent font-medium">Indicado para:</span> {combo.ideal}
              </p>
            </div>
          )}

          {/* CTA Button */}
          <button
            onClick={onContact}
            className="w-full btn-primary group/btn"
          >
            Quero Este Combo
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </button>

          {/* Limited Time Badge */}
          <div className="text-center mt-4">
            <span className="text-xs text-text-tertiary">
              Oferta por tempo limitado
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComboCard;
