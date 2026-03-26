import { pgTable, uuid, text, boolean, integer, timestamp, jsonb, varchar, uniqueIndex, index } from 'drizzle-orm/pg-core';

// ─── Core Tables ─────────────────────────────────────────────────────────────

export const clients = pgTable('clients', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  nickname: varchar('nickname', { length: 100 }).notNull(),
  description: text('description'),
  viewers: text('viewers').array().notNull().default([]),
  editors: text('editors').array().notNull().default([]),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const reports = pgTable('reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  lastEditedByUserId: text('last_edited_by_user_id'),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  fileType: varchar('file_type', { length: 10 }),
  fileUrl: text('file_url'),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const documents = pgTable('documents', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  originalContent: text('original_content'),
  currentContent: text('current_content'),
  fileName: varchar('file_name', { length: 255 }),
  status: varchar('status', { length: 50 }).default('draft'), // draft | processing | completed
  wordCount: integer('word_count').default(0),
  metadata: jsonb('metadata').$type<{ topics?: string[]; entities?: string[]; extractedData?: unknown }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const revisions = pgTable('revisions', {
  id: uuid('id').defaultRandom().primaryKey(),
  documentId: uuid('document_id').references(() => documents.id, { onDelete: 'cascade' }).notNull(),
  userId: text('user_id').notNull(),
  content: text('content').notNull(),
  changeSummary: text('change_summary'),
  isAiGenerated: boolean('is_ai_generated').default(false),
  versionNumber: integer('version_number').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const aiSessions = pgTable('ai_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  documentId: uuid('document_id').references(() => documents.id, { onDelete: 'cascade' }).notNull(),
  userId: text('user_id').notNull(),
  messages: jsonb('messages').$type<Array<{ role: string; content: string }>>().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const kinds = pgTable('kinds', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const kindReports = pgTable('kind_reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  kindId: uuid('kind_id').references(() => kinds.id, { onDelete: 'cascade' }).notNull(),
  reportId: uuid('report_id').references(() => reports.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const clientReports = pgTable('client_reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientId: uuid('client_id').references(() => clients.id, { onDelete: 'cascade' }).notNull(),
  reportId: uuid('report_id').references(() => reports.id, { onDelete: 'cascade' }).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => ({
  uniqueClientReport: uniqueIndex('client_reports_client_id_report_id_idx').on(t.clientId, t.reportId),
}));

export const reportRevisions = pgTable('report_revisions', {
  id: uuid('id').defaultRandom().primaryKey(),
  reportId: uuid('report_id').references(() => reports.id, { onDelete: 'cascade' }).notNull(),
  userId: text('user_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  fileType: varchar('file_type', { length: 10 }),
  versionNumber: integer('version_number').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message'),
  link: text('link'),
  read: boolean('read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => ({
  userReadIdx: index('notifications_user_id_read_idx').on(t.userId, t.read),
}));

export const aiUsage = pgTable('ai_usage', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  route: varchar('route', { length: 100 }).notNull(), // 'document-ai' | 'evaluation'
  // 'YYYY-MM-DD' UTC — used for atomic unique-constraint enforcement (free tier limit=1)
  dateBucket: varchar('date_bucket', { length: 10 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({
  userDateIdx: index('ai_usage_user_id_created_at_idx').on(t.userId, t.createdAt),
  // Unique per user per UTC day — prevents race conditions when limit=1
  userDateBucketUniq: uniqueIndex('ai_usage_user_id_date_bucket_idx').on(t.userId, t.dateBucket),
}));

export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  content: text('content'),
  coverImageUrl: text('cover_image_url'),
  category: text('category'),
  tags: text('tags').array(),
  status: text('status').notNull().default('draft'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ─── Template System ──────────────────────────────────────────────────────────

export const templateTags = pgTable('template_tags', {
  id: uuid('id').defaultRandom().primaryKey(),
  facilityType: varchar('facility_type', { length: 50 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const reportTemplates = pgTable('report_templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  facilityType: varchar('facility_type', { length: 50 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  fileType: varchar('file_type', { length: 10 }).default('excel'),
  responsible: varchar('responsible', { length: 100 }),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const templateTagReports = pgTable('template_tag_reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  templateTagId: uuid('template_tag_id').references(() => templateTags.id, { onDelete: 'cascade' }).notNull(),
  reportTemplateId: uuid('report_template_id').references(() => reportTemplates.id, { onDelete: 'cascade' }).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
}, (t) => ({
  uniqueTagReport: uniqueIndex('template_tag_reports_tag_id_report_id_idx').on(t.templateTagId, t.reportTemplateId),
}));

export const templateImports = pgTable('template_imports', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  facilityType: varchar('facility_type', { length: 50 }).notNull(),
  importedAt: timestamp('imported_at', { withTimezone: true }).defaultNow().notNull(),
});
