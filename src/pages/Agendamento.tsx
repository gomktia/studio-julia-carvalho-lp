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
        <div className="pt-32 pb-24 flex items-center justify-center">
          <div className="max-w-2xl w-full px-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10"
            >
              <CheckCircle className="w-12 h-12 text-emerald-500" />
            </motion.div>

            <h1 className="heading-xl mb-4 text-text-primary">Agendamento Realizado!</h1>
            <p className="text-text-secondary mb-12 italic">"Mal podemos esperar para cuidar de você."</p>

            <div className="bg-white border border-border/50 rounded-[2.5rem] p-8 md:p-12 shadow-xl mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16" />

              <div className="space-y-6 relative z-10">
                <div className="flex flex-col md:flex-row md:justify-between items-center pb-6 border-b border-border/50 gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold">Procedimento</span>
                  <span className="font-display text-2xl text-text-primary">{selectedService?.name}</span>
                </div>

                <div className="grid grid-cols-2 gap-8 pb-6 border-b border-border/50">
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold mb-1">Data</span>
                    <span className="font-medium text-text-primary">{selectedDate && formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold mb-1">Horário</span>
                    <span className="font-medium text-text-primary">{selectedTime}h</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold">Valor Total</span>
                  <span className="text-2xl font-display text-accent">{selectedService && formatPrice(selectedService.price)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => window.location.href = '/'} className="btn-primary px-10 h-14 rounded-2xl">
                Voltar ao Início
              </button>
              <a href="https://wa.me/5511933300012" target="_blank" className="btn-secondary px-8 h-14 rounded-2xl">
                Dúvidas no WhatsApp
              </a>
            </div>
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

      <div className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="label-uppercase text-accent mb-4 block">Reservas Online</span>
            <h1 className="heading-xl mb-4">
              <span className="text-text-primary">Sua jornada de </span>
              <span className="gradient-text italic text-6xl">beleza</span>
              <span className="text-text-primary"> começa aqui</span>
            </h1>
            <p className="text-body-light text-text-secondary max-w-xl mx-auto">
              Selecione o procedimento desejado e escolha o melhor momento para sua visita.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Main Booking Flow */}
            <div className="lg:col-span-8 space-y-12">

              {/* Step Navigation Bar */}
              <div className="flex items-center justify-between bg-white border border-border/50 p-2 rounded-2xl shadow-sm">
                {[1, 2, 3].map((s) => (
                  <button
                    key={s}
                    disabled={s > step && (!selectedService || (s === 3 && !selectedTime))}
                    onClick={() => setStep(s)}
                    className={`flex-1 flex items-center justify-center gap-3 h-12 rounded-xl transition-all ${step === s ? 'bg-text-primary text-white' : 'hover:bg-accent/5 text-text-tertiary'
                      } disabled:opacity-30 disabled:cursor-not-allowed`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${step === s ? 'border-white/20' : 'border-border'
                      }`}>
                      {s}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest hidden md:block">
                      {s === 1 ? 'Serviço' : s === 2 ? 'Horário' : 'Dados'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Step 1: Services */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <motion.div
                        key={service.id}
                        whileHover={{ y: -4 }}
                        onClick={() => { setSelectedService(service); setStep(2); }}
                        className={`group p-6 rounded-[2rem] cursor-pointer transition-all duration-300 relative overflow-hidden ${selectedService?.id === service.id
                            ? 'bg-text-primary text-white ring-4 ring-accent/10'
                            : 'bg-white border-border/50 hover:border-accent/30 shadow-sm hover:shadow-xl'
                          } border`}
                      >
                        <div className="flex justify-between items-start mb-4 relative z-10">
                          <h3 className={`font-display text-2xl ${selectedService?.id === service.id ? 'text-white' : 'text-text-primary'}`}>
                            {service.name}
                          </h3>
                          <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${selectedService?.id === service.id ? 'bg-white/20 text-white' : 'bg-accent/10 text-accent'
                            }`}>
                            {formatPrice(service.price)}
                          </div>
                        </div>

                        <p className={`text-sm mb-6 ${selectedService?.id === service.id ? 'text-white/70' : 'text-text-secondary'} font-light italic`}>
                          "{service.description}"
                        </p>

                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1.5 opacity-60">
                              <Clock className="w-3.5 h-3.5" />
                              {service.duration_minutes} min
                            </span>
                            <span className="opacity-60">{service.category}</span>
                          </div>

                          <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${selectedService?.id === service.id ? 'text-white' : 'text-accent'
                            }`} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Calendar & Time */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Calendar Container */}
                    <div className="bg-white border border-border/50 rounded-[2.5rem] p-8 shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                        <button
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                          className="w-10 h-10 flex items-center justify-center border border-border rounded-full hover:bg-accent/5 transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4 text-text-secondary" />
                        </button>
                        <h3 className="font-display text-2xl text-text-primary">
                          {monthNames[currentMonth.getMonth()]}, <span className="text-text-tertiary">{currentMonth.getFullYear()}</span>
                        </h3>
                        <button
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                          className="w-10 h-10 flex items-center justify-center border border-border rounded-full hover:bg-accent/5 transition-colors"
                        >
                          <ArrowRight className="w-4 h-4 text-text-secondary" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-2 mb-4">
                        {dayNames.map((day) => (
                          <div key={day} className="text-center text-[10px] font-bold text-text-tertiary uppercase tracking-widest py-2">
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-2">
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
                              className={`aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all ${isSelected
                                  ? 'bg-text-primary text-white shadow-lg'
                                  : isAvailable
                                    ? 'hover:bg-accent/10 border border-transparent hover:border-accent/20 text-text-primary'
                                    : 'text-text-tertiary/20 cursor-not-allowed'
                                }`}
                            >
                              {i + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Slots Container */}
                    <div className="bg-white border border-border/50 rounded-[2.5rem] p-8 shadow-sm">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-6">
                        {selectedDate ? formatDate(selectedDate) : 'Horários Disponíveis'}
                      </h3>

                      {selectedDate ? (
                        <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                          {getAvailableTimeSlots(selectedDate).map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`h-14 rounded-2xl text-sm font-bold transition-all border ${selectedTime === time
                                  ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20 animate-scale-in'
                                  : 'bg-white border-border/50 hover:border-accent/40 text-text-secondary'
                                }`}
                            >
                              {time}h
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="h-[300px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border/30 rounded-3xl">
                          <Calendar className="w-12 h-12 text-border mb-4" />
                          <p className="text-sm text-text-tertiary">Selecione uma data para<br />exibir os horários.</p>
                        </div>
                      )}

                      {selectedDate && selectedTime && (
                        <button onClick={() => setStep(3)} className="w-full btn-primary h-14 rounded-2xl mt-8 shadow-xl shadow-accent/20">
                          Confirmar Horário <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Information */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="bg-white border border-border/50 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                    <div className="flex flex-col gap-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold ml-1">Nome Completo</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                            <input
                              value={clientData.name}
                              onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                              placeholder="Como podemos chamar você?"
                              className={`w-full h-14 pl-12 pr-6 rounded-2xl bg-base border ${validationErrors.name ? 'border-error' : 'border-border/50'} focus:border-accent outline-none transition-all`}
                            />
                          </div>
                          {validationErrors.name && <p className="text-error text-[10px] ml-1">{validationErrors.name}</p>}
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold ml-1">WhatsApp</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                            <input
                              value={clientData.phone}
                              onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                              placeholder="(11) 99999-9999"
                              className={`w-full h-14 pl-12 pr-6 rounded-2xl bg-base border ${validationErrors.phone ? 'border-error' : 'border-border/50'} focus:border-accent outline-none transition-all`}
                            />
                          </div>
                          {validationErrors.phone && <p className="text-error text-[10px] ml-1">{validationErrors.phone}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold ml-1">E-mail</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                          <input
                            type="email"
                            value={clientData.email}
                            onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                            placeholder="seu@melhoremail.com"
                            className={`w-full h-14 pl-12 pr-6 rounded-2xl bg-base border ${validationErrors.email ? 'border-error' : 'border-border/50'} focus:border-accent outline-none transition-all`}
                          />
                        </div>
                      </div>

                      <div className="pt-6">
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting || !clientData.name || !clientData.email || !clientData.phone}
                          className="w-full h-16 btn-primary rounded-2xl text-base shadow-2xl shadow-accent/30 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            'Finalizar Agendamento'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
              <div className="bg-white border border-border/50 rounded-[2.5rem] p-8 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16" />

                <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-8 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  Resumo do Reserva
                </h3>

                <div className="space-y-6">
                  {selectedService ? (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-text-tertiary uppercase">Procedimento</span>
                      <div className="font-display text-xl text-text-primary">{selectedService.name}</div>
                    </div>
                  ) : (
                    <div className="text-sm text-text-tertiary italic">Nenhum serviço selecionado</div>
                  )}

                  <div className="divider opacity-30" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-text-tertiary uppercase">Data</span>
                      <div className="text-sm text-text-primary font-medium">
                        {selectedDate ? selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '---'}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-text-tertiary uppercase">Horário</span>
                      <div className="text-sm text-text-primary font-medium">
                        {selectedTime ? `${selectedTime}h` : '---'}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-accent/5 border border-accent/10">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-accent uppercase">Total Estimado</span>
                      <span className="text-lg font-display text-accent">
                        {selectedService ? formatPrice(selectedService.price) : '---'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-[2rem] bg-surface-elevated border border-border shadow-sm text-center">
                <p className="text-xs text-text-secondary leading-relaxed mb-1">Dúvidas com o agendamento?</p>
                <a href="https://wa.me/5511933300012" className="text-xs font-bold text-accent hover:underline">Fale conosco pelo WhatsApp</a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};


export default Agendamento;
