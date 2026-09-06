import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const page = await readFile('src/pages/index.astro', 'utf8');
const config = await readFile('src/config/site.ts', 'utf8');

test('landing page contains the required Build 2 sections', () => {
  for (const marker of [
    'site-header',
    'hero',
    'trust-strip',
    'scope-section',
    'process-section',
    'pricing-section',
    'area-section',
    'quote-section',
    'faq-section',
    'site-footer',
  ]) {
    assert.match(page, new RegExp(marker));
  }
});

test('primary CTA points to the quote section', () => {
  assert.match(page, /href="#quote"/);
  assert.match(config, /Get My Pool Closing Quote/);
});

test('phone number is centralized and uses a valid tel link', () => {
  assert.match(config, /647-640-8253/);
  assert.match(config, /tel:\+16476408253/);
});

test('unapproved exact public pricing is disabled by default', () => {
  assert.match(config, /showPublicPricing:\s*false/);
});

test('page avoids fabricated testimonial and certification claims', () => {
  assert.doesNotMatch(page, /5-star|five-star|certified|licensed|insured|guarantee/i);
});

test('page includes mobile responsive rules and reduced-motion support', () => {
  assert.match(page, /@media \(max-width: 640px\)/);
  assert.match(page, /prefers-reduced-motion/);
});
