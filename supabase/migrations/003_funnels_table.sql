CREATE TABLE IF NOT EXISTS public.funnels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  offer_description text,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.funnels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own their funnels" ON public.funnels
  FOR ALL USING (auth.uid() = user_id);
