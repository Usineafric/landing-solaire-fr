-- ============================================
-- SUPABASE RLS POLICIES POUR TABLE LEADS
-- ============================================
-- À exécuter dans Supabase SQL Editor
-- Dashboard > SQL Editor > New query

-- 1. ACTIVER ROW LEVEL SECURITY
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 2. SUPPRIMER LES ANCIENNES POLICIES (si existantes)
DROP POLICY IF EXISTS "Allow anonymous insert" ON leads;
DROP POLICY IF EXISTS "Allow authenticated read" ON leads;
DROP POLICY IF EXISTS "Allow authenticated update" ON leads;
DROP POLICY IF EXISTS "Allow authenticated delete" ON leads;

-- 3. POLICY: Permettre l'insertion anonyme (formulaire public)
-- Les visiteurs peuvent soumettre des leads sans être connectés
CREATE POLICY "Allow anonymous insert" ON leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. POLICY: Lecture réservée aux utilisateurs authentifiés (admin)
-- Seuls les admins connectés peuvent voir les leads
CREATE POLICY "Allow authenticated read" ON leads
FOR SELECT
TO authenticated
USING (true);

-- 5. POLICY: Mise à jour réservée aux utilisateurs authentifiés (admin)
CREATE POLICY "Allow authenticated update" ON leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 6. POLICY: Suppression réservée aux utilisateurs authentifiés (admin)
CREATE POLICY "Allow authenticated delete" ON leads
FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- CRÉATION D'UN UTILISATEUR ADMIN
-- ============================================
-- Option 1: Via Dashboard Supabase
-- Authentication > Users > Add user > Create new user
-- Email: votre-email@example.com
-- Password: votre-mot-de-passe-securise

-- Option 2: Via SQL (non recommandé pour production)
-- INSERT INTO auth.users (email, encrypted_password, ...)
-- Utilisez plutôt le dashboard pour créer l'utilisateur

-- ============================================
-- VÉRIFICATION
-- ============================================
-- Pour vérifier que les policies sont actives:
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'leads';
