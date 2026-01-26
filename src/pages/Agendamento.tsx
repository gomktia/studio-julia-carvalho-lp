import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { z } from 'zod';

const clientSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" })
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, { message: "Nome deve conter apenas letras" }),
  email: z.string()
    .trim()
    .email({ message: "E-mail inválido" })
    .max(255, { message: "E-mail deve ter no máximo 255 caracteres" }),
  phone: z.string()
    .trim()
    .regex(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/, { message: "Telefone inválido. Use o formato (XX) 9XXXX-XXXX" })
});

type ValidationErrors = {
  name?: string;
  email?: string;
  phone?: string;
};

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  category: string;
}

interface Availability {
  day_of_week: number;
  start_time: string;
  end_time: string;
}

interface Appointment {
  appointment_date: string;
  appointment_time: string;
}

const Agendamento = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [existingAppointments, setExistingAppointments] = useState<Appointment[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [honeypot, setHoneypot] = useState('');

  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchServices();
    fetchAvailability();
    fetchExistingAppointments();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('category', { ascending: true });
    if (data) setServices(data);
  };

  const fetchAvailability = async () => {
    const { data } = await supabase.from('availability').select('*').eq('active', true);
    if (data) setAvailability(data);
  };

  const fetchExistingAppointments = async () => {
    const { data } = await supabase
      .from('appointments')
      .select('appointment_date, appointment_time')
      .in('status', ['pending', 'confirmed']);
    if (data) setExistingAppointments(data);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { daysInMonth: lastDay.getDate(), startingDay: firstDay.getDay() };
  };

  const isDateAvailable = (date: Date) => {
    const dayOfWeek = date.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return false;
    return availability.some(a => a.day_of_week === dayOfWeek);
  };

  const getAvailableTimeSlots = (date: Date) => {
    const dayOfWeek = date.getDay();
    const dayAvailability = availability.find(a => a.day_of_week === dayOfWeek);
    if (!dayAvailability || !selectedService) return [];

    const slots: string[] = [];
    const startHour = parseInt(dayAvailability.start_time.split(':')[0]);
    const endHour = parseInt(dayAvailability.end_time.split(':')[0]);
    const duration = selectedService.duration_minutes;
    const dateStr = date.toISOString().split('T')[0];
    const bookedTimes = existingAppointments
      .filter(a => a.appointment_date === dateStr)
      .map(a => a.appointment_time);

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const endMinutes = hour * 60 + minute + duration;
        if (endMinutes <= endHour * 60 && !bookedTimes.includes(timeStr + ':00')) {
          slots.push(timeStr);
        }
      }
    }
    return slots;
  };

  const validateClientData = (): boolean => {
    try {
      clientSchema.parse(clientData);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: ValidationErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof ValidationErrors;
          errors[field] = err.message;
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    if (!selectedService || !selectedDate || !selectedTime) {
      toast({ title: "Erro", description: "Por favor, selecione serviço, data e horário.", variant: "destructive" });
      return;
    }

    if (!validateClientData()) {
      toast({ title: "Dados inválidos", description: "Por favor, corrija os erros no formulário.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const sanitizedData = {
        name: clientData.name.trim(),
        email: clientData.email.trim().toLowerCase(),
        phone: clientData.phone.trim()
      };

      const { data: clientResult, error: clientError } = await supabase
        .from('clients')
        .insert(sanitizedData)
        .select()
        .single();

      if (clientError) throw clientError;

      const { error: appointmentError } = await supabase
        .from('appointments')
        .insert({
          client_id: clientResult.id,
          service_id: selectedService.id,
          appointment_date: selectedDate.toISOString().split('T')[0],
          appointment_time: selectedTime + ':00',
          status: 'confirmed'
        });

      if (appointmentError) throw appointmentError;

      setIsSuccess(true);
      toast({ title: "Agendamento confirmado!", description: "Você receberá uma confirmação em breve." });
    } catch {
      toast({ title: "Erro ao agendar", description: "Tente novamente ou entre em contato pelo WhatsApp.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  const formatDate = (date: Date) => date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-base">
        <Header />
        <div className="pt-28 pb-24">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="w-12 h-12 text-success" />
            </motion.div>
            <h1 className="heading-xl mb-4 text-text-primary">Agendamento Confirmado!</h1>
            <div className="card-elevated p-8 mb-8 text-left">
              <div className="space-y-4">
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-text-secondary">Serviço:</span>
                  <span className="font-medium text-text-primary">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-text-secondary">Data:</span>
                  <span className="font-medium text-text-primary">{selectedDate && formatDate(selectedDate)}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-text-secondary">Horário:</span>
                  <span className="font-medium text-text-primary">{selectedTime}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Valor:</span>
                  <span className="font-medium gradient-text">{selectedService && formatPrice(selectedService.price)}</span>
                </div>
              </div>
            </div>
            <p className="text-text-secondary mb-8">
              Uma confirmação foi registrada. Caso precise alterar ou cancelar, entre em contato pelo WhatsApp.
            </p>
            <button onClick={() => window.location.href = '/'} className="btn-primary">
              Voltar ao Início
            </button>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base">
      <Header />

      <div className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="label-uppercase text-accent mb-4 block">Agendamento Online</span>
            <h1 className="heading-xl mb-4">
              <span className="text-text-primary">Agende seu</span>
              <br />
              <span className="gradient-text italic">horário</span>
            </h1>
            <p className="text-body-light text-text-secondary">
              Escolha o serviço, data e horário de sua preferência
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                    step >= s ? 'bg-accent text-white' : 'bg-surface border border-border text-text-tertiary'
                  }`}>
                    {s}
                  </div>
                  {s < 3 && <div className={`w-12 h-px mx-2 ${step > s ? 'bg-accent' : 'bg-border'}`} />}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Select Service */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-xl font-medium text-text-primary mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Selecione o Serviço
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => { setSelectedService(service); setStep(2); }}
                    className={`p-6 rounded-xl cursor-pointer transition-all ${
                      selectedService?.id === service.id
                        ? 'bg-accent/10 border-accent'
                        : 'bg-surface border-border hover:border-accent/50'
                    } border`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-text-primary">{service.name}</h3>
                      <span className="text-body-bold gradient-text">{formatPrice(service.price)}</span>
                    </div>
                    <p className="text-sm text-text-secondary mb-3">{service.description}</p>
                    <div className="flex items-center gap-4 text-sm text-text-tertiary">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{service.duration_minutes} min</span>
                      <span className="text-accent">{service.category}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-text-primary flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  Escolha Data e Horário
                </h2>
                <button onClick={() => setStep(1)} className="btn-ghost">
                  <ArrowLeft className="w-4 h-4" />Voltar
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calendar */}
                <div className="card-elevated p-6">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className="p-2 hover:bg-surface-elevated rounded-lg transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 text-text-secondary" />
                    </button>
                    <h3 className="font-medium text-text-primary">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      className="p-2 hover:bg-surface-elevated rounded-lg transition-colors"
                    >
                      <ArrowRight className="w-4 h-4 text-text-secondary" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day) => (
                      <div key={day} className="text-center text-xs font-medium text-text-tertiary py-2">{day}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: startingDay }).map((_, i) => <div key={`empty-${i}`} />)}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
                      const isAvailable = isDateAvailable(date);
                      const isSelected = selectedDate?.toDateString() === date.toDateString();

                      return (
                        <button
                          key={i}
                          onClick={() => isAvailable && setSelectedDate(date)}
                          disabled={!isAvailable}
                          className={`p-2 rounded-lg text-sm font-medium transition-all ${
                            isSelected ? 'bg-accent text-white' : isAvailable ? 'hover:bg-accent/10 text-text-secondary' : 'text-text-tertiary/30 cursor-not-allowed'
                          }`}
                        >
                          {i + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="card-elevated p-6">
                  <h3 className="font-medium text-text-primary mb-4">
                    {selectedDate ? formatDate(selectedDate) : 'Selecione uma data'}
                  </h3>

                  {selectedDate ? (
                    <div className="grid grid-cols-3 gap-2">
                      {getAvailableTimeSlots(selectedDate).map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg text-sm font-medium transition-all ${
                            selectedTime === time ? 'bg-accent text-white' : 'bg-surface-elevated hover:bg-accent/10 text-text-secondary'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-text-tertiary text-center py-8">Selecione uma data no calendário</p>
                  )}

                  {selectedDate && selectedTime && (
                    <button onClick={() => setStep(3)} className="w-full btn-primary mt-6">
                      Continuar <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Client Info */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-text-primary flex items-center gap-2">
                  <User className="w-5 h-5 text-accent" />
                  Seus Dados
                </h2>
                <button onClick={() => setStep(2)} className="btn-ghost">
                  <ArrowLeft className="w-4 h-4" />Voltar
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-elevated p-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                        <User className="w-4 h-4 text-accent" />Nome Completo
                      </label>
                      <input
                        id="name"
                        value={clientData.name}
                        onChange={(e) => {
                          setClientData({ ...clientData, name: e.target.value });
                          if (validationErrors.name) setValidationErrors({ ...validationErrors, name: undefined });
                        }}
                        placeholder="Digite seu nome"
                        className={`input-field ${validationErrors.name ? 'border-error' : ''}`}
                        maxLength={100}
                      />
                      {validationErrors.name && <p className="text-error text-sm mt-1">{validationErrors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                        <Mail className="w-4 h-4 text-accent" />E-mail
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={clientData.email}
                        onChange={(e) => {
                          setClientData({ ...clientData, email: e.target.value });
                          if (validationErrors.email) setValidationErrors({ ...validationErrors, email: undefined });
                        }}
                        placeholder="seu@email.com"
                        className={`input-field ${validationErrors.email ? 'border-error' : ''}`}
                        maxLength={255}
                      />
                      {validationErrors.email && <p className="text-error text-sm mt-1">{validationErrors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                        <Phone className="w-4 h-4 text-accent" />WhatsApp
                      </label>
                      <input
                        id="phone"
                        value={clientData.phone}
                        onChange={(e) => {
                          setClientData({ ...clientData, phone: e.target.value });
                          if (validationErrors.phone) setValidationErrors({ ...validationErrors, phone: undefined });
                        }}
                        placeholder="(11) 99999-9999"
                        className={`input-field ${validationErrors.phone ? 'border-error' : ''}`}
                        maxLength={20}
                      />
                      {validationErrors.phone && <p className="text-error text-sm mt-1">{validationErrors.phone}</p>}
                    </div>

                    {/* Honeypot */}
                    <div className="absolute -left-[9999px]" aria-hidden="true">
                      <input type="text" name="website" autoComplete="off" tabIndex={-1} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="card-elevated p-6">
                  <h3 className="font-medium text-text-primary mb-4">Resumo do Agendamento</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between"><span className="text-text-secondary">Serviço:</span><span className="text-text-primary">{selectedService?.name}</span></div>
                    <div className="flex justify-between"><span className="text-text-secondary">Data:</span><span className="text-text-primary">{selectedDate && formatDate(selectedDate)}</span></div>
                    <div className="flex justify-between"><span className="text-text-secondary">Horário:</span><span className="text-text-primary">{selectedTime}h</span></div>
                    <div className="flex justify-between"><span className="text-text-secondary">Duração:</span><span className="text-text-primary">{selectedService?.duration_minutes} min</span></div>
                    <div className="border-t border-border pt-3 mt-3">
                      <div className="flex justify-between text-lg">
                        <span className="font-medium text-text-primary">Total:</span>
                        <span className="text-body-bold gradient-text">{selectedService && formatPrice(selectedService.price)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !clientData.name || !clientData.email || !clientData.phone}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Agendando...' : 'Confirmar Agendamento'}
                  </button>

                  <p className="text-xs text-text-tertiary text-center mt-4">
                    Ao confirmar, você concorda com nossos termos de serviço
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Agendamento;
