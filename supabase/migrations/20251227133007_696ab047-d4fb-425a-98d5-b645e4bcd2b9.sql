-- Security fixes: lock down PII tables + add DB-level appointment validation

-- 1) CLIENTS: remove public read of PII
DROP POLICY IF EXISTS "Clientes podem ver seus próprios dados" ON public.clients;

-- Allow admins to view all clients
CREATE POLICY "Admins can view clients"
ON public.clients
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::public.app_role));


-- 2) APPOINTMENTS: remove public read, keep public create but validate at DB level
DROP POLICY IF EXISTS "Agendamentos são visíveis publicamente para verificação" ON public.appointments;
DROP POLICY IF EXISTS "Qualquer pessoa pode criar agendamento" ON public.appointments;

-- Admin-only SELECT
CREATE POLICY "Admins can view appointments"
ON public.appointments
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Public INSERT (validation happens in trigger below)
CREATE POLICY "Anyone can create appointment"
ON public.appointments
FOR INSERT
WITH CHECK (true);


-- 3) DB-level validation + anti double-booking
CREATE OR REPLACE FUNCTION public.validate_appointment_insert()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  -- Basic required validation
  IF NEW.appointment_date < CURRENT_DATE THEN
    RAISE EXCEPTION 'appointment_date must be today or later';
  END IF;

  IF NEW.appointment_time < '09:00:00'::time OR NEW.appointment_time > '18:00:00'::time THEN
    RAISE EXCEPTION 'appointment_time must be within business hours';
  END IF;

  IF NEW.status NOT IN ('pending', 'confirmed') THEN
    RAISE EXCEPTION 'invalid appointment status';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_validate_appointment_insert ON public.appointments;
CREATE TRIGGER trg_validate_appointment_insert
BEFORE INSERT ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION public.validate_appointment_insert();

-- Prevent double-booking of a slot (for active statuses)
CREATE UNIQUE INDEX IF NOT EXISTS unique_appointment_slot
ON public.appointments (appointment_date, appointment_time)
WHERE status IN ('pending', 'confirmed');


-- 4) SERVICES: Add admin management policies
CREATE POLICY "Admins can insert services"
ON public.services
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update services"
ON public.services
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete services"
ON public.services
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can view all services"
ON public.services
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::public.app_role));