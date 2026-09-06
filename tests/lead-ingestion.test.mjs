import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  extensionForMimeType,
  MAX_PHOTO_SIZE_BYTES,
  validateLeadPayload,
} from '../src/lib/lead-validation.mjs';

const now = Date.now();
const validPayload = {
  name: 'Sarah Example',
  phone: '647-555-0123',
  email: 'Sarah@Example.com',
  city: 'Mississauga',
  postal_code: 'L5B1M2',
  preferred_contact: 'text',
  timing: 'within-7-days',
  pool_type: 'in-ground',
  cover_type: 'safety',
  pool_size: '16 x 32 ft',
  notes: 'Side-gate access.',
  contact_consent: 'yes',
  company: '',
  form_started_at: String(now - 5000),
  utm_source: 'facebook',
  utm_medium: 'paid_social',
  utm_campaign: 'pool_closing_2026',
  landing_path: '/?utm_source=facebook',
};
const validPhotos = [{ type: 'image/jpeg', size: 1024 }];

test('valid lead payload normalizes and passes', () => {
  const result = validateLeadPayload(validPayload, validPhotos, now);
  assert.equal(result.ok, true);
  assert.equal(result.value.email, 'sarah@example.com');
  assert.equal(result.value.postal_code, 'L5B 1M2');
  assert.equal(result.value.service_type, 'pool-closing');
});

test('invalid required values are rejected server-side', () => {
  const result = validateLeadPayload({ ...validPayload, email: 'bad', timing: 'tomorrow-ish' }, validPhotos, now);
  assert.equal(result.ok, false);
  assert.ok(result.errors.email);
  assert.ok(result.errors.timing);
});

test('consent, honeypot, and minimum completion time are enforced server-side', () => {
  const result = validateLeadPayload({ ...validPayload, contact_consent: '', company: 'bot', form_started_at: String(now - 50) }, validPhotos, now);
  assert.equal(result.ok, false);
  assert.ok(result.errors.contact_consent);
  assert.ok(result.errors.form);
});

test('photo type, count, size, and minimum-one rules are enforced server-side', () => {
  assert.ok(validateLeadPayload(validPayload, [], now).errors.photos);
  assert.ok(validateLeadPayload(validPayload, [{ type: 'application/pdf', size: 10 }], now).errors.photos);
  assert.ok(validateLeadPayload(validPayload, [{ type: 'image/jpeg', size: MAX_PHOTO_SIZE_BYTES + 1 }], now).errors.photos);
  assert.ok(validateLeadPayload(validPayload, Array.from({ length: 5 }, () => ({ type: 'image/jpeg', size: 10 })), now).errors.photos);
});

test('storage extensions are derived from MIME type rather than user filenames', () => {
  assert.equal(extensionForMimeType('image/jpeg'), 'jpg');
  assert.equal(extensionForMimeType('image/png'), 'png');
  assert.equal(extensionForMimeType('image/webp'), 'webp');
  assert.equal(extensionForMimeType('image/svg+xml'), null);
});

test('API endpoint is POST-only, server validated, and cleans uploaded files after failure', async () => {
  const endpoint = await readFile('src/pages/api/leads.ts', 'utf8');
  assert.match(endpoint, /validateLeadPayload/);
  assert.match(endpoint, /multipart\/form-data/);
  assert.match(endpoint, /supabase\.rpc\('next_lead_number'\)/);
  assert.match(endpoint, /storage\.from\(bucket\)\.upload/);
  assert.match(endpoint, /cleanupUploads/);
  assert.match(endpoint, /export const GET/);
  assert.doesNotMatch(endpoint, /SUPABASE_SERVICE_ROLE_KEY.*PUBLIC_/);
});

test('migration creates private storage and RLS-protected lead table', async () => {
  const sql = await readFile('supabase/migrations/0001_lead_ingestion.sql', 'utf8');
  assert.match(sql, /create table if not exists public\.leads/i);
  assert.match(sql, /enable row level security/i);
  assert.match(sql, /revoke all on table public\.leads from anon/i);
  assert.match(sql, /'lead-photos'/);
  assert.match(sql, /false,/);
  assert.match(sql, /next_lead_number/i);
});
