-- ─────────────────────────────────────────────────────────────
-- SahayakAI — ALTER TABLE: Extend government_schemes
-- Run this AFTER the original schema.sql migration.
-- ─────────────────────────────────────────────────────────────

ALTER TABLE public.government_schemes
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS subcategory TEXT,
  ADD COLUMN IF NOT EXISTS government_level TEXT DEFAULT 'central',
  ADD COLUMN IF NOT EXISTS state TEXT DEFAULT 'all',
  ADD COLUMN IF NOT EXISTS target_beneficiary TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS min_age INT,
  ADD COLUMN IF NOT EXISTS max_age INT,
  ADD COLUMN IF NOT EXISTS gender TEXT DEFAULT 'all',
  ADD COLUMN IF NOT EXISTS caste_category TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS income_limit TEXT,
  ADD COLUMN IF NOT EXISTS benefits JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS benefit_amount TEXT,
  ADD COLUMN IF NOT EXISTS application_mode TEXT DEFAULT 'online',
  ADD COLUMN IF NOT EXISTS launch_date DATE,
  ADD COLUMN IF NOT EXISTS deadline DATE,
  ADD COLUMN IF NOT EXISTS official_website TEXT,
  ADD COLUMN IF NOT EXISTS helpline TEXT,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS views_count INT DEFAULT 0;

-- Performance indexes for common filters
CREATE INDEX IF NOT EXISTS idx_schemes_category ON public.government_schemes(category);
CREATE INDEX IF NOT EXISTS idx_schemes_state ON public.government_schemes(state);
CREATE INDEX IF NOT EXISTS idx_schemes_slug ON public.government_schemes(slug);
CREATE INDEX IF NOT EXISTS idx_schemes_active ON public.government_schemes(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_schemes_featured ON public.government_schemes(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_schemes_govt_level ON public.government_schemes(government_level);
