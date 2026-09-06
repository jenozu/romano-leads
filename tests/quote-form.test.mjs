import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const form = await readFile('src/components/QuoteForm.astro', 'utf8');
const formConfig = await readFile('src/config/form.ts', 'utf8');
const landing = await readFile('src/pages/index.astro', 'utf8');

test('landing page renders the quote form component', () => {
  assert.match(landing, /import QuoteForm/);
  assert.match(landing, /<QuoteForm\s*\/>/);
});

test('quote form includes required contact and pool fields', () => {
  for (const token of [
    'name="name"',
    'name="phone"',
    'name="email"',
    'name="city"',
    'name="postal_code"',
    'name="timing"',
    'name="pool_type"',
    'name="cover_type"',
    'name="photos"',
    'name="contact_consent"',
  ]) {
    assert.match(form, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('photo upload accepts multiple mobile-friendly image formats and enforces configured limits', () => {
  assert.match(form, /multiple/);
  assert.match(form, /image\/jpeg,image\/png,image\/webp/);
  assert.match(formConfig, /maxFiles:\s*4/);
  assert.match(formConfig, /8 \* 1024 \* 1024/);
  assert.match(formConfig, /photoRequired:\s*true/);
});

test('form provides photo preview removal and duplicate submit protection', () => {
  assert.match(form, /photo-preview-grid/);
  assert.match(form, /photo-remove/);
  assert.match(form, /submitButton\.disabled = true/);
});

test('form includes custom validation for phone, email, postal code, pool details, photos, and consent', () => {
  assert.match(form, /validatePhone/);
  assert.match(form, /validity\.valid/);
  assert.match(form, /validatePostalCode/);
  assert.match(form, /pool_type/);
  assert.match(form, /cover_type/);
  assert.match(form, /selectedFiles\.length === 0/);
  assert.match(form, /contact-consent/);
});

test('form focuses the first invalid field and contains a honeypot', () => {
  assert.match(form, /firstInvalid\.focus\(\)/);
  assert.match(form, /class="honeypot"/);
});

test('thank-you and privacy pages exist', async () => {
  await access('src/pages/thank-you.astro');
  await access('src/pages/privacy.astro');
});

test('Build 3 uses a front-end success path ready for Build 4 replacement', () => {
  assert.match(form, /window\.location\.assign\('\/thank-you'\)/);
});
