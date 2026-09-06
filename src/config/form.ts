export const quoteFormConfig = {
  maxFiles: 4,
  maxFileSizeBytes: 8 * 1024 * 1024,
  acceptedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  photoRequired: true,
  timingOptions: [
    { value: 'asap', label: 'ASAP' },
    { value: 'within-7-days', label: 'Within 7 days' },
    { value: '1-2-weeks', label: '1–2 weeks' },
    { value: '2-4-weeks', label: '2–4 weeks' },
    { value: 'researching', label: 'Just researching' },
  ],
  poolTypeOptions: [
    { value: 'in-ground', label: 'In-ground' },
    { value: 'above-ground', label: 'Above-ground' },
    { value: 'unsure', label: 'Not sure' },
  ],
  coverTypeOptions: [
    { value: 'safety', label: 'Safety cover' },
    { value: 'tarp-winter', label: 'Tarp / winter cover' },
    { value: 'other', label: 'Other' },
    { value: 'unsure', label: 'Not sure' },
  ],
  contactMethods: [
    { value: 'phone', label: 'Phone call' },
    { value: 'text', label: 'Text message' },
    { value: 'email', label: 'Email' },
  ],
} as const;
