-- Allow admins to update and delete appointments
CREATE POLICY "Admins can update appointments"
ON public.appointments
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete appointments"
ON public.appointments
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::public.app_role));