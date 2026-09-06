export const siteConfig = {
  name: 'Blue Horizon Pools',
  phoneDisplay: '647-640-8253',
  phoneHref: 'tel:+16476408253',
  defaultTitle: 'Pool Closing & Winterization | Blue Horizon Pools',
  defaultDescription:
    'Request a pool closing quote from Blue Horizon Pools. Send your pool details and photos so the right closing package can be confirmed.',
  campaign: {
    eyebrow: 'Fall pool closing',
    headline: 'Close your pool properly before winter.',
    subheadline:
      'Tell us about your pool, upload a few photos, and Blue Horizon Pools will review the setup and help confirm the right closing package.',
    primaryCta: 'Get My Pool Closing Quote',
    secondaryCta: 'Call Blue Horizon Pools',
  },
  pricing: {
    showPublicPricing: false,
    startingAt: 324.99,
    packages: [
      { code: 'SC-1', price: 324.99 },
      { code: 'SC-2', price: 374.99 },
      { code: 'SC-3', price: 399.99 },
    ],
  },
  serviceArea: {
    heading: 'Serving homeowners across the GTA',
    summary:
      'Blue Horizon Pools serves customers across the Greater Toronto Area and surrounding communities. Exact availability is confirmed when your request is reviewed.',
    cities: [] as string[],
  },
  businessFactsPendingApproval: {
    email: true,
    logo: true,
    photography: true,
    exactServiceCities: true,
    publicPricingDisplay: true,
    exactClosingScope: true,
    testimonials: true,
    licensingInsuranceClaims: true,
  },
} as const;

export const benefits = [
  {
    title: 'Easy quote request',
    body: 'Send the information needed to review your pool without a long phone call.',
  },
  {
    title: 'Photo-based review',
    body: 'Photos help Blue Horizon Pools understand your pool and cover setup before confirming the right package.',
  },
  {
    title: 'Local pool service',
    body: 'Work with a GTA pool-service provider rather than a generic national lead marketplace.',
  },
  {
    title: 'Clear next step',
    body: 'After your request is reviewed, you are contacted directly to discuss pricing and scheduling.',
  },
] as const;

export const closingOverview = [
  'Pool and equipment setup reviewed before package confirmation',
  'Pool-cover configuration considered as part of the quote',
  'Closing details confirmed directly with you before service is arranged',
] as const;

export const processSteps = [
  {
    number: '01',
    title: 'Tell us about your pool',
    body: 'Share your contact details, pool type, cover type, and preferred timing.',
  },
  {
    number: '02',
    title: 'Upload a few photos',
    body: 'Photos of the pool, cover, and equipment area help make the review more useful.',
  },
  {
    number: '03',
    title: 'Your setup is reviewed',
    body: 'Blue Horizon Pools reviews the information and determines which closing package fits your setup.',
  },
  {
    number: '04',
    title: 'Arrange your closing',
    body: 'You are contacted directly to confirm the details and arrange the next step.',
  },
] as const;

export const faqs = [
  {
    question: 'How much does pool closing cost?',
    answer:
      'Pricing depends on the pool and cover setup. Blue Horizon Pools currently uses several closing package levels, and the right fit is confirmed after reviewing your information and photos.',
  },
  {
    question: 'Why do you need photos?',
    answer:
      'Photos help show the pool, cover, and equipment setup so Blue Horizon Pools can review the job before confirming a package.',
  },
  {
    question: 'How soon should I request a closing?',
    answer:
      'If you already know when you want the pool closed, submit the request early so availability can be checked for your preferred timing.',
  },
  {
    question: 'What areas do you service?',
    answer:
      'Blue Horizon Pools serves the GTA and surrounding communities. Submit your city or postal code and availability for your location can be confirmed.',
  },
  {
    question: 'What happens after I request a quote?',
    answer:
      'Your pool information is reviewed and Blue Horizon Pools contacts you directly to discuss the appropriate package, pricing, and scheduling.',
  },
] as const;
