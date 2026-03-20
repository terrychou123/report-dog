-- Migration: Replace workspace system with tag-level permissions
-- Removes workspace tables and adds viewers/editors arrays to clients table

-- Drop workspace-related foreign key columns first (to remove FK constraints)
ALTER TABLE clients DROP COLUMN IF EXISTS workspace_id;
ALTER TABLE reports DROP COLUMN IF EXISTS workspace_id;
ALTER TABLE kinds DROP COLUMN IF EXISTS workspace_id;

-- Add tag permission arrays to clients
ALTER TABLE clients ADD COLUMN IF NOT EXISTS viewers text[] NOT NULL DEFAULT '{}';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS editors text[] NOT NULL DEFAULT '{}';

-- Drop workspace tables (order matters due to FK references)
DROP TABLE IF EXISTS workspace_invitations;
DROP TABLE IF EXISTS workspace_members;
DROP TABLE IF EXISTS workspaces;
DROP TABLE IF EXISTS user_profiles;
