export const ALLOWED_TIMINGS = new Set(['asap', 'within-7-days', '1-2-weeks', '2-4-weeks', 'researching']);
export const ALLOWED_POOL_TYPES = new Set(['in-ground', 'above-ground', 'unsure']);
export const ALLOWED_COVER_TYPES = new Set(['safety', 'tarp-winter', 'other', 'unsure']);
export const ALLOWED_CONTACT_METHODS = new Set(['phone', 'text', 'email']);
export const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
export const MAX_PHOTOS = 4;
export const MAX_PHOTO_SIZE_BYTES = 8 * 1024 * 1024;
export const MIN_FORM_COMPLETION_MS = 1200;

const POSTAL_CODE = /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ][ -]?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeString(value, maxLength = 500) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\u0000/g, '').slice(0, maxLength);
}

export function normalizePostalCode(value) {
  const cleaned = normalizeString(value, 7).toUpperCase().replace(/\s+/g, '');
  if (cleaned.length !== 6) return normalizeString(value, 7).toUpperCase();
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
}

export function normalizePhone(value) {
  return normalizeString(value, 40);
}

export function validateLeadPayload(payload, files = [], now = Date.now()) {
  const errors = {};
  const normalized = {
    name: normalizeString(payload.name, 120),
    phone: normalizePhone(payload.phone),
    email: normalizeString(payload.email, 254).toLowerCase(),
    city: normalizeString(payload.city, 120),
    postal_code: normalizePostalCode(payload.postal_code),
    preferred_contact: normalizeString(payload.preferred_contact, 20),
    service_type: 'pool-closing',
    timing: normalizeString(payload.timing, 30),
    pool_type: normalizeString(payload.pool_type, 30),
    cover_type: normalizeString(payload.cover_type, 30),
    pool_size: normalizeString(payload.pool_size, 80),
    notes: normalizeString(payload.notes, 2000),
    contact_consent: payload.contact_consent === 'yes' || payload.contact_consent === true,
    utm_source: normalizeString(payload.utm_source, 160),
    utm_medium: normalizeString(payload.utm_medium, 160),
    utm_campaign: normalizeString(payload.utm_campaign, 200),
    utm_content: normalizeString(payload.utm_content, 200),
    utm_term: normalizeString(payload.utm_term, 200),
    landing_path: normalizeString(payload.landing_path, 500),
    referrer: normalizeString(payload.referrer, 1000),
  };

  if (!normalized.name) errors.name = 'Full name is required.';
  if (normalized.phone.replace(/\D/g, '').length < 10) errors.phone = 'Enter a valid phone number.';
  if (!EMAIL.test(normalized.email)) errors.email = 'Enter a valid email address.';
  if (!normalized.city) errors.city = 'City is required.';
  if (!POSTAL_CODE.test(normalized.postal_code)) errors.postal_code = 'Enter a valid Canadian postal code.';
  if (!ALLOWED_TIMINGS.has(normalized.timing)) errors.timing = 'Choose a valid service timeframe.';
  if (!ALLOWED_POOL_TYPES.has(normalized.pool_type)) errors.pool_type = 'Choose a valid pool type.';
  if (!ALLOWED_COVER_TYPES.has(normalized.cover_type)) errors.cover_type = 'Choose a valid cover type.';
  if (normalized.preferred_contact && !ALLOWED_CONTACT_METHODS.has(normalized.preferred_contact)) {
    errors.preferred_contact = 'Choose a valid contact method.';
  }
  if (!normalized.contact_consent) errors.contact_consent = 'Contact consent is required.';

  const startedAt = Number(payload.form_started_at || 0);
  if (!Number.isFinite(startedAt) || startedAt <= 0 || now - startedAt < MIN_FORM_COMPLETION_MS) {
    errors.form = 'Please review the form and try again.';
  }

  if (normalizeString(payload.company, 200)) errors.form = 'Unable to submit this request.';

  if (!Array.isArray(files) || files.length === 0) {
    errors.photos = 'Please add at least one pool photo.';
  } else if (files.length > MAX_PHOTOS) {
    errors.photos = `Please upload no more than ${MAX_PHOTOS} photos.`;
  } else {
    for (const file of files) {
      if (!file || typeof file !== 'object' || !ALLOWED_IMAGE_TYPES.has(file.type)) {
        errors.photos = 'Only JPG, PNG, and WebP photos are supported.';
        break;
      }
      if (!Number.isFinite(file.size) || file.size <= 0 || file.size > MAX_PHOTO_SIZE_BYTES) {
        errors.photos = 'Each photo must be between 1 byte and 8 MB.';
        break;
      }
    }
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    value: normalized,
  };
}

export function extensionForMimeType(type) {
  if (type === 'image/jpeg') return 'jpg';
  if (type === 'image/png') return 'png';
  if (type === 'image/webp') return 'webp';
  return null;
}
