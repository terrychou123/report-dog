-- Workspaces table
CREATE TABLE "workspaces" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar(100) NOT NULL,
  "slug" varchar(100) NOT NULL,
  "facility_type" varchar(50),
  "owner_id" text NOT NULL,
  "max_members" integer DEFAULT 5 NOT NULL,
  "settings" jsonb DEFAULT '{}',
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "workspaces_slug_unique" UNIQUE ("slug")
);

-- Workspace members table
CREATE TABLE "workspace_members" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "workspace_id" uuid NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "user_id" text NOT NULL,
  "role" varchar(20) DEFAULT 'editor' NOT NULL,
  "joined_at" timestamp DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX "workspace_members_workspace_id_user_id_idx" ON "workspace_members" ("workspace_id", "user_id");

-- Workspace invitations table
CREATE TABLE "workspace_invitations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "workspace_id" uuid NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "invited_by_user_id" text NOT NULL,
  "email" text,
  "token" text NOT NULL,
  "role" varchar(20) DEFAULT 'editor' NOT NULL,
  "status" varchar(20) DEFAULT 'pending' NOT NULL,
  "expires_at" timestamp NOT NULL,
  "accepted_at" timestamp,
  "created_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "workspace_invitations_token_unique" UNIQUE ("token")
);

-- User profiles table
CREATE TABLE "user_profiles" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" text NOT NULL,
  "display_name" varchar(100),
  "avatar_url" text,
  "current_workspace_id" uuid,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "user_profiles_user_id_unique" UNIQUE ("user_id")
);

-- Add workspace_id to existing tables (nullable for backward compatibility)
ALTER TABLE "reports" ADD COLUMN "workspace_id" uuid REFERENCES "workspaces"("id") ON DELETE SET NULL;
ALTER TABLE "reports" ADD COLUMN "last_edited_by_user_id" text;
ALTER TABLE "clients" ADD COLUMN "workspace_id" uuid REFERENCES "workspaces"("id") ON DELETE SET NULL;
ALTER TABLE "kinds" ADD COLUMN "workspace_id" uuid REFERENCES "workspaces"("id") ON DELETE SET NULL;

-- Indexes for performance
CREATE INDEX "workspace_members_workspace_id_idx" ON "workspace_members" ("workspace_id");
CREATE INDEX "workspace_members_user_id_idx" ON "workspace_members" ("user_id");
CREATE INDEX "workspace_invitations_token_idx" ON "workspace_invitations" ("token");
CREATE INDEX "workspace_invitations_email_idx" ON "workspace_invitations" ("email");
CREATE INDEX "reports_workspace_id_idx" ON "reports" ("workspace_id");
CREATE INDEX "clients_workspace_id_idx" ON "clients" ("workspace_id");
CREATE INDEX "kinds_workspace_id_idx" ON "kinds" ("workspace_id");
