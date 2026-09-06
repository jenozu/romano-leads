import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { extensionForMimeType, validateLeadPayload } from '../../lib/lead-validation.mjs';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const formString = (form: FormData, key: string) => {
  const value = form.get(key);
  return typeof value === 'string' ? value : '';
};

const cleanupUploads = async (
  supabase: ReturnType<typeof createClient>,
  bucket: string,
  paths: string[],
) => {
  if (paths.length === 0) return;
  await supabase.storage.from(bucket).remove(paths);
};

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return json({ ok: false, message: 'Expected a multipart form submission.' }, 415);
  }

  const supabaseUrl = import.meta.env.SUPABASE_URL;
  const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = import.meta.env.SUPABASE_STORAGE_BUCKET || 'lead-photos';

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Lead submission backend is not configured.');
    return json(
      { ok: false, message: 'Quote requests are temporarily unavailable. Please call Blue Horizon Pools.' },
      503,
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, message: 'We could not read your submission. Please try again.' }, 400);
  }

  const photos = form
    .getAll('photos')
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  const payload = {
    name: formString(form, 'name'),
    phone: formString(form, 'phone'),
    email: formString(form, 'email'),
    city: formString(form, 'city'),
    postal_code: formString(form, 'postal_code'),
    preferred_contact: formString(form, 'contact_method'),
    timing: formString(form, 'timing'),
    pool_type: formString(form, 'pool_type'),
    cover_type: formString(form, 'cover_type'),
    pool_size: formString(form, 'pool_size'),
    notes: formString(form, 'notes'),
    contact_consent: formString(form, 'contact_consent'),
    company: formString(form, 'company'),
    form_started_at: formString(form, 'form_started_at'),
    utm_source: formString(form, 'utm_source'),
    utm_medium: formString(form, 'utm_medium'),
    utm_campaign: formString(form, 'utm_campaign'),
    utm_content: formString(form, 'utm_content'),
    utm_term: formString(form, 'utm_term'),
    landing_path: formString(form, 'landing_path'),
    referrer: formString(form, 'referrer'),
  };

  const validation = validateLeadPayload(payload, photos);
  if (!validation.ok) {
    return json(
      {
        ok: false,
        message: 'Please correct the highlighted fields and try again.',
        errors: validation.errors,
      },
      422,
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: leadNumber, error: leadNumberError } = await supabase.rpc('next_lead_number');
  if (leadNumberError || typeof leadNumber !== 'string') {
    console.error('Unable to allocate lead number:', leadNumberError?.message);
    return json({ ok: false, message: 'We could not save your request. Please try again.' }, 500);
  }

  const uploadedPaths: string[] = [];

  try {
    for (const [index, photo] of photos.entries()) {
      const extension = extensionForMimeType(photo.type);
      if (!extension) throw new Error('Unsupported photo type passed validation.');

      const storagePath = `leads/${leadNumber}/${crypto.randomUUID()}-${index + 1}.${extension}`;
      const bytes = await photo.arrayBuffer();
      const { error: uploadError } = await supabase.storage.from(bucket).upload(storagePath, bytes, {
        contentType: photo.type,
        cacheControl: '3600',
        upsert: false,
      });

      if (uploadError) throw new Error(`Photo upload failed: ${uploadError.message}`);
      uploadedPaths.push(storagePath);
    }

    const now = new Date().toISOString();
    const { error: insertError } = await supabase.from('leads').insert({
      lead_number: leadNumber,
      ...validation.value,
      preferred_contact: validation.value.preferred_contact || null,
      pool_size: validation.value.pool_size || null,
      notes: validation.value.notes || null,
      contact_consent: true,
      consent_at: now,
      photo_paths: uploadedPaths,
      utm_source: validation.value.utm_source || null,
      utm_medium: validation.value.utm_medium || null,
      utm_campaign: validation.value.utm_campaign || null,
      utm_content: validation.value.utm_content || null,
      utm_term: validation.value.utm_term || null,
      landing_path: validation.value.landing_path || null,
      referrer: validation.value.referrer || null,
    });

    if (insertError) throw new Error(`Lead insert failed: ${insertError.message}`);

    return json({ ok: true, leadNumber }, 201);
  } catch (error) {
    await cleanupUploads(supabase, bucket, uploadedPaths);
    console.error('Lead submission failed:', error instanceof Error ? error.message : error);
    return json(
      { ok: false, message: 'We could not save your request. Your form is still here, so please try again.' },
      500,
    );
  }
};

export const GET: APIRoute = async () => json({ ok: false, message: 'Method not allowed.' }, 405);
