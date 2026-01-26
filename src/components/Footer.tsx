import { motion } from "framer-motion";
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="mb-6">
              <span className="font-display text-2xl text-text-primary">
                Studio <span className="gradient-text italic">Ju Carvalho</span>
              </span>
            </div>
            <p className="text-body-light text-text-secondary mb-8 max-w-sm">
              Formação profissional em estética com excelência e certificação reconhecida.
              Transformando paixão em profissão desde 2014.
            </p>
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/studiojucarvalho._/?igsh=MWUyYzh1ajl1OGw4dQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="label-uppercase text-text-tertiary mb-6">Navegação</h4>
            <ul className="space-y-3">
              {[
                { label: 'Cursos', id: 'cursos' },
                { label: 'Depoimentos', id: 'depoimentos' },
                { label: 'FAQ', id: 'faq' },
                { label: 'Inscreva-se', id: 'inscricao' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-text-secondary hover:text-text-primary transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="label-uppercase text-text-tertiary mb-6">Contato</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+5511933300012"
                  className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors text-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <span>11 93330-0012</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:espacoju101@gmail.com"
                  className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors text-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <span>espacoju101@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-text-secondary text-sm">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="divider my-12" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-tertiary">
            © {currentYear} Studio Ju Carvalho. Todos os direitos reservados.
          </p>
          <p className="text-sm text-text-tertiary">
            Desenvolvido por <span className="text-accent">GOMKT.IA</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
