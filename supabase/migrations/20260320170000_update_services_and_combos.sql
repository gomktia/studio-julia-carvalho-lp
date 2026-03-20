-- Update services and combos marketing pricing/copy
-- This migration is designed to be re-runnable: it updates existing rows by `name`
-- and (re)creates targeted combos by `title`.

BEGIN;

-- Services: update existing where names match the current seed
UPDATE public.services
SET price = 180.00
WHERE name = 'Limpeza de Pele';

UPDATE public.services
SET name = 'Micropigmentação Labial',
    price = 550.00
WHERE name = 'Micropigmentação Labial';

-- Rename "Shadow 3D" to the requested label and update price
UPDATE public.services
SET name = 'Micropigmentação Shadow',
    price = 550.00
WHERE name = 'Shadow 3D';

UPDATE public.services
SET price = 150.00
WHERE name = 'Brow Lamination';

-- Keep Microagulhamento at 200, but enforce the value
UPDATE public.services
SET price = 200.00
WHERE name = 'Microagulhamento';

-- Ensure the requested services exist (insert when missing)
INSERT INTO public.services (name, description, price, duration_minutes, category, active)
SELECT
  v.name, v.description, v.price, v.duration_minutes, v.category, v.active
FROM (
  VALUES
    ('Botox glabela', 'Aplicação de toxina botulínica para redução de glabela.', 699.00, 45, 'Estética Facial', true),
    ('Botox Full Face', 'Aplicação de toxina botulínica para harmonização facial (full face).', 990.00, 90, 'Estética Facial', true),
    ('Preenchimento labial 1ml', 'Preenchimento labial (1ml) para definição e volume.', 499.00, 90, 'Micropigmentação', true),
    ('Micropigmentação Fio a Fio', 'Técnica fio a fio para sobrancelhas com aspecto natural.', 550.00, 120, 'Micropigmentação', true),
    ('Lash Lifting', 'Curvatura e coloração natural dos cílios (lash lifting).', 200.00, 60, 'Cílios', true),
    ('Jato de plasma', 'Jato de plasma (a partir) para tratamento estético.', 200.00, 60, 'Estética Facial', true)
) AS v(name, description, price, duration_minutes, category, active)
WHERE NOT EXISTS (
  SELECT 1 FROM public.services s WHERE s.name = v.name
);

-- If "Extensão de Cílios" exists as a service, deactivate it
UPDATE public.services
SET active = false
WHERE name ILIKE '%Extensão% Cílios%'
   OR name ILIKE '%Extensao% Cilios%'
   OR name ILIKE '%Extens% Cílios%'
   OR name ILIKE '%Extens% Cilios%';


-- Combos: re-create targeted combos and combo_services by title
-- (We delete + insert to ensure consistent pricing even if structure changed.)

-- Helper deletes per combo title
DELETE FROM public.combo_services
USING public.combos
WHERE public.combo_services.combo_id = public.combos.id
  AND public.combos.title IN (
    'Combo boca perfeita',
    'Combo glow basic',
    'Combo rejuvenescimento',
    'Combro reconstrução de micropigmentação',
    'Combo glow up flash'
  );

DELETE FROM public.combos
WHERE title IN (
  'Combo boca perfeita',
  'Combo glow basic',
  'Combo rejuvenescimento',
  'Combro reconstrução de micropigmentação',
  'Combo glow up flash'
);

-- Insert combos (prices from user totals; item prices inferred to sum exactly to combo_price)
INSERT INTO public.combos (title, campaign, campaign_color, description, original_price, combo_price, discount, ideal, active)
VALUES
  ('Combo boca perfeita', NULL, 'pink', 'Combo focado em lábios: preenchimento, micropigmentação e cuidados de finalização.', 1000.00, 1000.00, NULL, NULL, true),
  ('Combo glow basic', NULL, 'pink', 'Combo com limpeza e tratamento para potencializar resultados.', 400.00, 400.00, NULL, NULL, true),
  ('Combo rejuvenescimento', NULL, 'pink', 'Combo de harmonização e rejuvenescimento com procedimento completo.', 1100.00, 1100.00, NULL, NULL, true),
  ('Combro reconstrução de micropigmentação', NULL, 'pink', 'Reconstrução com volume e técnica fio a fio/estrutura.', 990.00, 990.00, NULL, NULL, true),
  ('Combo glow up flash', NULL, 'pink', 'Glow rápido com design, limpeza e potencialização de resultados.', 500.00, 500.00, NULL, NULL, true);

-- Insert combo services (combo_services.nome + price)
-- Pricing inference used (option 1): inferred missing unit prices so each combo_services sum matches combo_price.
INSERT INTO public.combo_services (combo_id, name, price)
SELECT
  c.id,
  cs.name,
  cs.price
FROM public.combos c
JOIN (
  VALUES
    -- Combo boca perfeita (total 1000)
    ('Combo boca perfeita', 'Preenchimento labial 1ml', 419.00),
    ('Combo boca perfeita', 'Micropigmentação Labial', 461.00),
    ('Combo boca perfeita', 'Epilação buço e mento', 60.00),
    ('Combo boca perfeita', 'Hidratação labial', 60.00),

    -- Combo glow basic (total 400)
    ('Combo glow basic', 'Limpeza de pele', 180.00),
    ('Combo glow basic', 'Epilação facial', 20.00),
    ('Combo glow basic', 'Microagulhamento +ativos', 200.00),

    -- Combo rejuvenescimento (total 1100)
    ('Combo rejuvenescimento', 'Botox Full Face', 990.00),
    ('Combo rejuvenescimento', 'Revitalização fácil', 40.00),
    ('Combo rejuvenescimento', 'Jato de plasma (região dos olhos ou pé de galinha)', 70.00),

    -- Combro reconstrução de micropigmentação (total 990)
    ('Combro reconstrução de micropigmentação', 'Microagulhamento', 200.00),
    ('Combro reconstrução de micropigmentação', 'Microagulhamento', 200.00),
    ('Combro reconstrução de micropigmentação', 'Brow Lamination', 150.00),
    ('Combro reconstrução de micropigmentação', 'Micropigmentação reconstrutora', 440.00),

    -- Combo glow up flash (total 500)
    ('Combo glow up flash', 'Design de sobrancelha', 130.00),
    ('Combo glow up flash', 'Limpeza de pele', 156.00),
    ('Combo glow up flash', 'Microagulhamento', 174.00),
    ('Combo glow up flash', 'Epilação fácil', 40.00)
) AS cs(combo_title, name, price)
  ON c.title = cs.combo_title;

COMMIT;

