-- Run this SQL in your Supabase dashboard:
-- Go to: supabase.com → your project → SQL Editor → New Query → paste & run

-- Create user_profiles table to store emails and user info
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (important for Supabase)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Allow users to insert/update their own profile
CREATE POLICY "Users can upsert own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Allow the service role (used by Supabase triggers/functions) full access
CREATE POLICY "Service role full access"
  ON public.user_profiles FOR ALL
  USING (auth.role() = 'service_role');
