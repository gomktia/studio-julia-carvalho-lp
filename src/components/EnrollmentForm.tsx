import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, ArrowRight } from 'lucide-react';
import { useEnrollmentStore } from '../store/enrollmentStore';
import { EnrollmentFormData } from '../types/Course';
import { courses } from '../types/mockCourses';

const EnrollmentForm = () => {
  const [formData, setFormData] = useState<EnrollmentFormData>({
    name: '',
    email: '',
    phone: '',
    courseId: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const addEnrollment = useEnrollmentStore((state) => state.addEnrollment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnrollment(formData);

    // Construct WhatsApp message
    const selectedCourse = courses.find(c => c.id === formData.courseId)?.title || formData.courseId;
    const phoneNumber = '5511933300012';
    const text = `*Nova Inscrição pelo Site*
    
*Nome:* ${formData.name}
*Email:* ${formData.email}
*WhatsApp:* ${formData.phone}
*Curso de Interesse:* ${selectedCourse}
*Mensagem:* ${formData.message || 'Sem mensagem'}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');

    setIsSubmitted(true);

    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        courseId: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="inscricao" className="py-24 bg-base relative overflow-hidden">
      {/* Editorial Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-50/50 rounded-full blur-[100px] -ml-48 -mb-48" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Section Header & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-6 block">Início da Jornada</span>
            <h2 className="heading-xl mb-8">
              <span className="text-text-primary">Transforme sua </span>
              <span className="gradient-text italic">carreira</span>
              <span className="text-text-primary"> hoje</span>
            </h2>
            <p className="text-text-secondary mb-12 font-light leading-relaxed text-lg italic opacity-80">
              "O sucesso na área da estética começa com a escolha certa. Estamos prontos para guiar você em cada passo."
            </p>

            <div className="space-y-6">
              {[
                'Certificação Nacional e Internacional',
                'Material Didático Exclusivo Incluso',
                'Modelos Reais para Prática Supervisionada',
                'Suas dúvidas respondidas via WhatsApp'
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                    <CheckCircle className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-sm text-text-primary/80 font-medium tracking-tight">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-border/50 p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-black/[0.02] relative"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold ml-1">Nome Completo</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full h-14 px-6 rounded-2xl bg-base border border-border/50 focus:border-accent outline-none transition-all text-sm"
                      placeholder="Ex: Maria Oliveira"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold ml-1">E-mail</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full h-14 px-6 rounded-2xl bg-base border border-border/50 focus:border-accent outline-none transition-all text-sm"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold ml-1">WhatsApp</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full h-14 px-6 rounded-2xl bg-base border border-border/50 focus:border-accent outline-none transition-all text-sm"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="courseId" className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold ml-1">Curso de Interesse</label>
                    <select
                      id="courseId"
                      name="courseId"
                      value={formData.courseId}
                      onChange={handleChange}
                      required
                      className="w-full h-14 px-6 rounded-2xl bg-base border border-border/50 focus:border-accent outline-none transition-all text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Selecione o curso</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>{course.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold ml-1">Mensagem (Opcional)</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-6 rounded-2xl bg-base border border-border/50 focus:border-accent outline-none transition-all text-sm resize-none"
                      placeholder="Conte-nos seus objetivos..."
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-16 bg-text-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl hover:shadow-accent/20 transition-all overflow-hidden relative group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Enviar Inscrição
                    <Send className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="font-display text-3xl text-text-primary mb-4 italic">
                  Quase lá!
                </h3>
                <p className="text-text-secondary font-light">
                  Sua inscrição foi enviada com sucesso. Em breve você receberá nosso contato no WhatsApp.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnrollmentForm;
