import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
    setExpandedMobileItem(null);
  };

  const navItems = [
    { label: 'Início', id: 'hero' },
    { label: 'Sobre', id: 'sobre' },
    {
      label: 'Studio',
      id: 'studio-menu',
      subItems: [
        { label: 'O Studio', id: 'studio' },
        { label: 'Resultados', id: 'resultados' },
        { label: 'Depoimentos', id: 'depoimentos' },
      ]
    },
    {
      label: 'Serviços',
      id: 'servicos-menu',
      subItems: [
        { label: 'Ver Todos', id: 'servicos' },
        { label: 'Combos Especiais', id: 'combos' },
      ]
    },
    { label: 'Cursos', id: 'cursos' },
    { label: 'Inscrição', id: 'inscricao' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contato', id: 'contato' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <div className="flex flex-col">
              <span className={`font-display text-xl sm:text-2xl tracking-tight transition-colors duration-300 ${isScrolled ? 'text-text-primary' : 'text-white'}`}>
                Estudio <span className="gradient-text italic">Júlia Carvalho</span>
              </span>
              <span className={`label-uppercase text-[10px] transition-colors duration-300 hidden sm:block ${isScrolled ? 'text-text-tertiary' : 'text-white/80'}`}>
                Estética avançada profissional Dr Júlia carvalho.
              </span>
            </div>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                {item.subItems ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className={`btn-ghost flex items-center gap-1 transition-colors duration-300 outline-none ${isScrolled ? 'text-text-secondary' : 'text-white hover:text-white/80'}`}>
                      {item.label}
                      <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass border-border/50 p-2 min-w-[180px]">
                      {item.subItems.map((subItem) => (
                        <DropdownMenuItem
                          key={subItem.id}
                          onClick={() => scrollToSection(subItem.id)}
                          className="cursor-pointer rounded-lg hover:bg-accent-subtle hover:text-accent transition-colors py-2.5 px-3 font-medium text-sm"
                        >
                          {subItem.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`btn-ghost link-underline transition-colors duration-300 ${isScrolled ? 'text-text-secondary' : 'text-white hover:text-white/80'}`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? 'text-text-primary' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 transition-colors duration-300 ${isScrolled ? 'text-text-primary' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden glass border-t border-border/50"
          >
            <nav className="px-6 py-6 space-y-1">
              {navItems.map((item, index) => (
                <div key={item.id}>
                  {item.subItems ? (
                    <div className="flex flex-col">
                      <button
                        onClick={() => setExpandedMobileItem(expandedMobileItem === item.id ? null : item.id)}
                        className="flex items-center justify-between w-full px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-elevated rounded-lg transition-all font-medium"
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedMobileItem === item.id ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {expandedMobileItem === item.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden bg-surface-elevated/50 rounded-lg mt-1 mx-2"
                          >
                            {item.subItems.map((subItem) => (
                              <button
                                key={subItem.id}
                                onClick={() => scrollToSection(subItem.id)}
                                className="block w-full text-left px-8 py-3 text-sm text-text-secondary hover:text-accent transition-colors"
                              >
                                {subItem.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-elevated rounded-lg transition-all font-medium"
                    >
                      {item.label}
                    </motion.button>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
