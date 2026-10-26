/*
# Create contact_submissions table

1. New Tables
- `contact_submissions`
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `email` (text, not null)
  - `phone` (text, not null)
  - `company` (text, nullable)
  - `country` (text, not null)
  - `service_interest` (text, not null)
  - `budget_range` (text, not null)
  - `message` (text, not null)
  - `status` (text, default 'new') — new / contacted / qualified / archived
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

2. Security
- Enable RLS on `contact_submissions`.
- This is a public consultation form (no sign-in required to submit).
- Grant INSERT to anon + authenticated so visitors can submit enquiries.
- Grant SELECT/UPDATE/DELETE only to authenticated (admin/staff will manage submissions).
- Anon can only INSERT; anon cannot read or list submissions (protects visitor privacy).
- Add an index on created_at for chronological listing.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  country text NOT NULL,
  service_interest text NOT NULL,
  budget_range text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_submissions_status_idx ON contact_submissions (status);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- anon + authenticated can submit new enquiries
GRANT INSERT ON contact_submissions TO anon, authenticated;

-- only authenticated (admin/staff) can read, update, delete submissions
GRANT SELECT, UPDATE, DELETE ON contact_submissions TO authenticated;

DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions" ON contact_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_contact_submissions" ON contact_submissions;
CREATE POLICY "auth_select_contact_submissions" ON contact_submissions FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_contact_submissions" ON contact_submissions;
CREATE POLICY "auth_update_contact_submissions" ON contact_submissions FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_contact_submissions" ON contact_submissions;
CREATE POLICY "auth_delete_contact_submissions" ON contact_submissions FOR DELETE
  TO authenticated USING (true);