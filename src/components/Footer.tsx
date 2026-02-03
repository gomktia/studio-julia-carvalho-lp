import { motion } from "framer-motion";
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-text-primary text-white border-t border-white/5 pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Brand Background */}
      <div className="absolute top-0 right-0 p-24 opacity-[0.02] pointer-events-none">
        <span className="font-display text-[20vw] italic leading-none whitespace-nowrap">Júlia Carvalho</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">

          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-8">
            <div className="flex flex-col">
              <span className="font-display text-4xl tracking-tight mb-2">
                Estudio <span className="text-rose-300 italic">Júlia Carvalho</span>
              </span>
              <div className="h-0.5 w-12 bg-rose-300/30" />
            </div>

            <p className="text-white/60 text-lg font-light leading-relaxed max-w-sm italic">
              "Excelência técnica e sensibilidade artística para formar os melhores profissionais de estética do mercado."
            </p>

            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://www.instagram.com/studiojucarvalho._/?igsh=MWUyYzh1ajl1OGw4dQ%3D%3D&utm_source=qr" },
                { icon: Facebook, href: "#" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  href={social.href}
                  target="_blank"
                  className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center transition-colors shadow-2xl shadow-black/20"
                >
                  <social.icon className="w-5 h-5 text-rose-200" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-bold text-rose-200 uppercase tracking-[0.3em] mb-10">Explorar</h4>
            <ul className="space-y-4">
              {[
                { label: 'Formação & Cursos', id: 'cursos' },
                { label: 'Depoimentos Reais', id: 'depoimentos' },
                { label: 'Suporte & FAQ', id: 'faq' },
                { label: 'Portal de Inscrição', id: 'inscricao' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/50 hover:text-white transition-all text-sm flex items-center gap-3 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-300/20 group-hover:bg-rose-300 transition-colors" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-bold text-rose-200 uppercase tracking-[0.3em] mb-10">Atendimento</h4>
            <ul className="space-y-6">
              <li>
                <a href="tel:+5511933300012" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-rose-300/30 transition-colors">
                    <Phone className="w-5 h-5 text-rose-200" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">WhatsApp Business</span>
                    <span className="text-sm font-medium tracking-wide">11 93330-0012</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:espacoju101@gmail.com" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-rose-300/30 transition-colors">
                    <Mail className="w-5 h-5 text-rose-200" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">E-mail Oficial</span>
                    <span className="text-sm font-medium tracking-wide">espacoju101@gmail.com</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[10px] font-medium text-white/30 uppercase tracking-[0.2em]">
              © {currentYear} Estudio Júlia Carvalho • Todos os direitos reservados
            </p>
            <div className="flex gap-4">
              <button onClick={() => window.dispatchEvent(new CustomEvent('open-policy', { detail: 'privacy' }))} className="text-[9px] font-bold text-white/20 uppercase tracking-[0.1em] hover:text-rose-300 transition-colors">Política de Privacidade</button>
              <button onClick={() => window.dispatchEvent(new CustomEvent('open-policy', { detail: 'terms' }))} className="text-[9px] font-bold text-white/20 uppercase tracking-[0.1em] hover:text-rose-300 transition-colors">Termos de Uso</button>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Desenvolvido por</span>
              <span className="text-sm font-display italic text-rose-300">Geison Höehr</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
