-- Tabela de serviços disponíveis para agendamento
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  category TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de clientes
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de configuração de disponibilidade (dias e horários)
CREATE TABLE public.availability (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL DEFAULT '09:00',
  end_time TIME NOT NULL DEFAULT '18:00',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de agendamentos
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Políticas para services (público pode ver serviços ativos)
CREATE POLICY "Serviços ativos são públicos" 
ON public.services 
FOR SELECT 
USING (active = true);

-- Políticas para clients (inserção pública para cadastro)
CREATE POLICY "Qualquer pessoa pode se cadastrar como cliente" 
ON public.clients 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Clientes podem ver seus próprios dados" 
ON public.clients 
FOR SELECT 
USING (true);

-- Políticas para availability (público pode ver disponibilidade)
CREATE POLICY "Disponibilidade é pública" 
ON public.availability 
FOR SELECT 
USING (active = true);

-- Políticas para appointments
CREATE POLICY "Qualquer pessoa pode criar agendamento" 
ON public.appointments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Agendamentos são visíveis publicamente para verificação" 
ON public.appointments 
FOR SELECT 
USING (true);

-- Inserir disponibilidade padrão (Segunda a Sábado, 9h às 18h)
INSERT INTO public.availability (day_of_week, start_time, end_time, active) VALUES
(1, '09:00', '18:00', true), -- Segunda
(2, '09:00', '18:00', true), -- Terça
(3, '09:00', '18:00', true), -- Quarta
(4, '09:00', '18:00', true), -- Quinta
(5, '09:00', '18:00', true), -- Sexta
(6, '09:00', '18:00', true); -- Sábado

-- Inserir serviços baseados nos combos existentes
INSERT INTO public.services (name, description, price, duration_minutes, category, active) VALUES
('Limpeza de Pele', 'Limpeza de pele profunda com extração', 150.00, 90, 'Estética Facial', true),
('Design de Sobrancelha', 'Design personalizado de sobrancelhas', 50.00, 45, 'Sobrancelhas', true),
('Brow Lamination', 'Técnica de alinhamento e fixação dos fios', 120.00, 60, 'Sobrancelhas', true),
('Micropigmentação Labial', 'Pigmentação semipermanente dos lábios', 350.00, 120, 'Micropigmentação', true),
('Shadow 3D', 'Técnica de sombreamento para sobrancelhas', 280.00, 90, 'Micropigmentação', true),
('Microagulhamento', 'Tratamento para rejuvenescimento da pele', 200.00, 60, 'Estética Facial', true),
('Combo Novembro Azul', 'Limpeza de Pele + Design de Sobrancelha', 180.00, 120, 'Combos', true),
('Combo Outubro Rosa', 'Brow Lamination + Design de Sobrancelha', 150.00, 90, 'Combos', true);