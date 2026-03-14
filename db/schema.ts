import { pgTable, uuid, text, boolean, integer, timestamp, jsonb, varchar, uniqueIndex } from 'drizzle-orm/pg-core';

export const clients = pgTable('clients', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  nickname: varchar('nickname', { length: 100 }).notNull(),
  description: text('description'),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const reports = pgTable('reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
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
