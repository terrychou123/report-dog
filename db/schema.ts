import { pgTable, uuid, text, boolean, integer, timestamp, jsonb, varchar } from 'drizzle-orm/pg-core';

export const clients = pgTable('clients', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  nickname: varchar('nickname', { length: 100 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const reports = pgTable('reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  clientId: uuid('client_id').references(() => clients.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  fileType: varchar('file_type', { length: 10 }),
  fileUrl: text('file_url'),
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
