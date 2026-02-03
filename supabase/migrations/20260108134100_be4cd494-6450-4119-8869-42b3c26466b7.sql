-- Add CHECK constraints for client data validation
-- This provides server-side validation to match client-side zod schema

-- Email format validation (RFC 5322 simplified)
ALTER TABLE public.clients
ADD CONSTRAINT check_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Name length validation (2-100 chars, not empty after trim)
ALTER TABLE public.clients
ADD CONSTRAINT check_name_length 
CHECK (length(trim(name)) >= 2 AND length(name) <= 100);

-- Brazilian phone format validation (flexible format)
ALTER TABLE public.clients
ADD CONSTRAINT check_phone_format 
CHECK (phone ~* '^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$');