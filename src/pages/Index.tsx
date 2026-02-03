import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';

// Lazy load components that are below the fold
const AboutSection = lazy(() => import('../components/AboutSection'));
const SalonGallery = lazy(() => import('../components/SalonGallery'));
const CourseCard = lazy(() => import('../components/CourseCard'));
const ComboCard = lazy(() => import('../components/ComboCard'));
const ServicesSection = lazy(() => import('../components/ServicesSection'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const FAQ = lazy(() => import('../components/FAQ'));
const EnrollmentForm = lazy(() => import('../components/EnrollmentForm'));
const Footer = lazy(() => import('../components/Footer'));
const CookieConsent = lazy(() => import('../components/CookieConsent'));
const WhatsAppButton = lazy(() => import('../components/WhatsAppButton'));
const BeforeAfter = lazy(() => import('../components/BeforeAfter'));
const LocationSection = lazy(() => import('../components/LocationSection'));
const InstagramFeed = lazy(() => import('../components/InstagramFeed'));
const BackToTop = lazy(() => import('../components/BackToTop'));
const SkeletonLoader = lazy(() => import('../components/SkeletonLoader'));
import { testimonials, faqItems, courses as localCourses } from '../types/mockCourses';
import { supabase } from '@/integrations/supabase/client';
import { Combo } from '@/types/Combo';
import { Course } from '@/types/Course';
import { BookOpen, Gift, Coffee, GraduationCap, Check } from 'lucide-react';

const Index = () => {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch combos with services
    const { data: combosData } = await supabase
      .from('combos')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (combosData) {
      const combosWithServices = await Promise.all(
        combosData.map(async (combo) => {
          const { data: services } = await supabase
            .from('combo_services')
            .select('*')
            .eq('combo_id', combo.id);

          return {
            id: combo.id,
            title: combo.title,
            campaign: combo.campaign || '',
            campaignColor: combo.campaign_color || 'pink',
            description: combo.description || '',
            services: (services || []).map((s) => ({ name: s.name, price: s.price })),
            originalPrice: combo.original_price,
            comboPrice: combo.combo_price,
            discount: combo.discount || '',
            ideal: combo.ideal || '',
          };
        })
      );
      setCombos(combosWithServices);
    }

    // Use local mock data for courses instead of Supabase
    setCourses(localCourses);

    setIsLoading(false);
  };

  const handleCourseContact = (course: Course) => {
    if (course.checkoutUrl) {
      window.open(course.checkoutUrl, '_blank');
      return;
    }
    const phoneNumber = '5511933300012';
    const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre o curso: ${course.title}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleComboContact = (comboTitle: string) => {
    const phoneNumber = '5511933300012';
    const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre o combo: ${comboTitle}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const features = [
    { icon: BookOpen, label: 'Material de Estudo Completo' },
    { icon: Gift, label: 'Kit Personalizado' },
    { icon: Coffee, label: 'Coffee Break' },
    { icon: GraduationCap, label: 'Certificação Reconhecida' },
  ];

  return (
    <div className="min-h-screen bg-base">
      <Header />
      <Hero />

      <Suspense fallback={<div className="h-96 bg-surface animate-pulse" />}>
        <AboutSection />
        <SalonGallery />
        <BeforeAfter />
        <ServicesSection />

        {/* Combos Section */}
        <section id="combos" className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="label-uppercase text-accent mb-4 block">Ofertas Especiais</span>
              <h2 className="heading-xl mb-6">
                <span className="text-text-primary">Combos </span>
                <span className="gradient-text italic">promocionais</span>
              </h2>
              <p className="text-body-light text-text-secondary max-w-xl mx-auto">
                Pacotes exclusivos com descontos especiais para você economizar e cuidar ainda mais de você
              </p>
            </motion.div>

            {isLoading ? (
              <Suspense fallback={null}><SkeletonLoader count={3} /></Suspense>
            ) : combos.length === 0 ? (
              <p className="text-center text-text-tertiary">Nenhum combo disponível no momento.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {combos.map((combo, index) => (
                  <ComboCard
                    key={combo.id}
                    combo={combo}
                    index={index}
                    onContact={() => handleComboContact(combo.title)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Courses Section */}
        <section id="cursos" className="py-24 bg-base">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="label-uppercase text-accent mb-4 block">Formação Profissional</span>
              <h2 className="heading-xl mb-6">
                <span className="text-text-primary">Nossos </span>
                <span className="gradient-text italic">cursos profissionais</span>
              </h2>
              <p className="text-body-light text-text-secondary max-w-xl mx-auto">
                Formação completa com certificação, material didático, kit personalizado e prática supervisionada
              </p>
            </motion.div>

            {/* New Promo Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black p-8 md:p-12 text-center shadow-2xl border border-white/10"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <BookOpen className="w-64 h-64 text-white" />
              </div>

              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="inline-block px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-sm font-bold tracking-wider mb-6 border border-rose-500/30">
                  PRÉ-VENDA LANÇAMENTO 🚀
                </div>

                <h3 className="text-3xl md:text-5xl font-display text-white mb-6">
                  Qualquer curso <span className="text-rose-400 italic">Online</span> por apenas <br />
                  <span className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-200 to-rose-400">R$ 299,00</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-8 text-left bg-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/10">
                  <div>
                    <h4 className="flex items-center gap-2 text-xl font-medium text-white mb-4">
                      <span className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-sm">01</span>
                      Cursos Online
                    </h4>
                    <ul className="space-y-3 text-white/70">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-rose-400 shrink-0" />
                        Acesso completo ao conteúdo digital
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-rose-400 shrink-0" />
                        Apostila Digital (PDF)
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-rose-400 shrink-0" />
                        Certificado Digital
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-rose-400 shrink-0" />
                        Suporte via Grupo VIP
                      </li>
                    </ul>
                  </div>

                  <div className="relative">
                    <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                      MAIS VENDIDO
                    </div>
                    <h4 className="flex items-center gap-2 text-xl font-medium text-white mb-4">
                      <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">02</span>
                      Adicional Com Material
                    </h4>
                    <p className="text-white/60 mb-4 text-sm">
                      Adicione <strong className="text-white">R$ 99,00</strong> e receba em casa:
                    </p>
                    <ul className="space-y-3 text-white/70">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-white shrink-0" />
                        <strong className="text-white">Apostila Física</strong> impressa
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-white shrink-0" />
                        <strong className="text-white">Certificado Impresso</strong>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-white shrink-0" />
                        <strong className="text-white">Kit Personalizado</strong> do curso
                      </li>
                      <li className="flex items-start gap-2 text-xs bg-white/10 p-2 rounded">
                        <Gift className="w-4 h-4 text-rose-300 shrink-0" />
                        Frete Grátis SP / Desconto Brasil
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {isLoading ? (
              <Suspense fallback={null}><SkeletonLoader count={3} /></Suspense>
            ) : courses.length === 0 ? (
              <p className="text-center text-text-tertiary">Nenhum curso disponível no momento.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {courses.map((course, index) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    index={index}
                    onEnroll={() => handleCourseContact(course)}
                  />
                ))}
              </div>
            )}

            {/* Features Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-8 md:p-12"
            >
              <h3 className="font-display text-2xl text-text-primary text-center mb-8">
                Todos os cursos incluem:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="text-sm text-text-secondary font-medium">{feature.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Testimonials testimonials={testimonials} />
        <FAQ items={faqItems} />
        <InstagramFeed />
        <EnrollmentForm />
        <LocationSection />
        <Footer />
        <CookieConsent />
        <WhatsAppButton />
        <BackToTop />
      </Suspense>
    </div>
  );
};

export default Index;
