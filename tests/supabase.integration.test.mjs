import test from 'node:test';
import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'lead-photos';
const enabled = Boolean(url && key);

const integration = enabled ? test : test.skip;

integration('Supabase schema, lead numbering, private photo storage, and cleanup work end to end', async () => {
  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

  const { data: leadNumber, error: numberError } = await supabase.rpc('next_lead_number');
  assert.equal(numberError, null, numberError?.message);
  assert.match(leadNumber, /^BH-\d{6}$/);

  const path = `integration/${leadNumber}/probe.txt`;
  const upload = await supabase.storage.from(bucket).upload(path, new TextEncoder().encode('integration-probe'), {
    contentType: 'text/plain',
    upsert: false,
  });

  // The production bucket intentionally only allows image MIME types. A rejected text upload
  // proves the bucket restriction is active. Then use a tiny PNG-signature payload for storage.
  assert.ok(upload.error, 'text/plain should be rejected by the lead-photo bucket');

  const imagePath = `integration/${leadNumber}/probe.png`;
  const imageBytes = Uint8Array.from([137,80,78,71,13,10,26,10]);
  const imageUpload = await supabase.storage.from(bucket).upload(imagePath, imageBytes, {
    contentType: 'image/png',
    upsert: false,
  });
  assert.equal(imageUpload.error, null, imageUpload.error?.message);

  const lead = {
    lead_number: leadNumber,
    name: 'Integration Test',
    phone: '647-555-0100',
    email: 'integration@example.com',
    city: 'Mississauga',
    postal_code: 'L5B 1M2',
    preferred_contact: 'email',
    service_type: 'pool-closing',
    timing: 'within-7-days',
    pool_type: 'in-ground',
    cover_type: 'safety',
    photo_paths: [imagePath],
    contact_consent: true,
    consent_at: new Date().toISOString(),
    status: 'NEW',
    lead_score: 'UNSCORED',
    utm_source: 'integration-test',
  };

  const inserted = await supabase.from('leads').insert(lead).select('id, lead_number, photo_paths').single();
  assert.equal(inserted.error, null, inserted.error?.message);
  assert.equal(inserted.data.lead_number, leadNumber);
  assert.deepEqual(inserted.data.photo_paths, [imagePath]);

  const fetched = await supabase.from('leads').select('lead_number, utm_source').eq('lead_number', leadNumber).single();
  assert.equal(fetched.error, null, fetched.error?.message);
  assert.equal(fetched.data.utm_source, 'integration-test');

  const deleteLead = await supabase.from('leads').delete().eq('lead_number', leadNumber);
  assert.equal(deleteLead.error, null, deleteLead.error?.message);
  const deletePhoto = await supabase.storage.from(bucket).remove([imagePath]);
  assert.equal(deletePhoto.error, null, deletePhoto.error?.message);
});
