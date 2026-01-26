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
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-rose-100/50 to-pink-100/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-rose-50/40 to-pink-50/20 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="label-uppercase text-accent mb-4 block">Inscrição</span>
          <h2 className="heading-xl mb-6">
            <span className="text-text-primary">Garanta sua</span>
            <br />
            <span className="gradient-text italic">vaga agora</span>
          </h2>
          <p className="text-body-light text-text-secondary max-w-xl mx-auto">
            Preencha o formulário e entraremos em contato em breve
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-elevated p-8 md:p-12"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Seu nome completo"
                />
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <label htmlFor="courseId" className="block text-sm font-medium text-text-secondary mb-2">
                  Curso de Interesse
                </label>
                <select
                  id="courseId"
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  required
                  className="input-field appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23737373'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5rem'
                  }}
                >
                  <option value="" className="bg-surface text-text-tertiary">Selecione um curso</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id} className="bg-surface text-text-primary">
                      {course.title} - R$ {course.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                  Mensagem <span className="text-text-tertiary">(Opcional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Conte-nos mais sobre suas expectativas..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full btn-primary py-4 text-base"
              >
                <Send className="w-5 h-5" />
                Enviar Inscrição
              </motion.button>

              <p className="text-sm text-text-tertiary text-center">
                Ao enviar, você concorda em receber informações sobre nossos cursos
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h3 className="font-display text-3xl text-text-primary mb-4">
                Inscrição Enviada!
              </h3>
              <p className="text-body-light text-text-secondary">
                Em breve entraremos em contato pelo WhatsApp informado.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            'Certificação Inclusa',
            'Material Completo',
            'Prática Supervisionada'
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-accent" />
              </div>
              <span className="text-sm text-text-secondary">{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EnrollmentForm;
