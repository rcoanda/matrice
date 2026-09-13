// Design system « Aqua » — variante bleu profond.
export default {
  key: 'aquaKey',
  label: 'Aqua',
  meta: {
    id: 'aqua',
    name: 'Aqua',
    description: 'Bleu profond & sable, typographies voices.',
    version: '1.0.0',
    tailwind: true,
  },
  colors: {
    gallery:         { value: '#1B3A4B' },
    galleryLight:    { value: '#F1E9D6' },
    galleryMuted:    { value: '#1B3A4B55' },
    galleryMuted2:   { value: '#1B3A4B77' },
    accent:          { value: '#1B3A4B' },
    cream:           { value: '#F1E9D6' },
    surface:         { value: '#FBFAF3' },
    'on-accent':     { value: '#F1E9D6' },
    backdrop:        { value: 'rgba(10, 25, 35, 0.6)' },
    'hover-overlay': { value: 'rgba(255, 255, 255, 0.3)' },
    'subtle-overlay':{ value: 'rgba(255, 255, 255, 0.1)' },
    'faint-overlay': { value: 'rgba(255, 255, 255, 0.05)' },
    'hero-vignette': { value: 'rgba(27, 58, 75, 0.18)' },
  },
  font: {
    display: {
      families: ['Syncopate'],
      weights: '400;700',
      fallbacks: ['Georgia', 'serif'],
    },
    body: {
      families: ['Manrope'],
      weights: '400;700',
      fallbacks: ['system-ui', 'sans-serif'],
    },
  },
  typography: {
    sizes: {
      hero:      { value: '3rem' },
      display:   { value: '2.5rem' },
      featured:  { value: '2rem' },
      lead:      { value: '1.25rem' },
      cardTitle: { value: '1.2rem' },
      base:      { value: '1rem' },
      small:     { value: '0.875rem' },
      xsmall:    { value: '0.75rem' },
      micro:     { value: '0.65rem' },
    },
    tracking: {
      tight: { value: '0.025em' },
      label: { value: '0.05em' },
      wide:  { value: '0.1em' },
      wider: { value: '0.18em' },
    },
  },
  radius: {
    cards:   { value: '24px' },
    buttons: { value: '12px' },
    fields:  { value: '16px' },
    md:      { value: '16px' },
    sm:      { value: '6px' },
  },
  shadow: {
    card: { value: '0 12px 30px rgba(27, 58, 75, 0.2)' },
    lift: { value: '0 8px 20px rgba(27, 58, 75, 0.18)' },
  },
  spacing: {
    containerMaxWidth: { value: '80rem' },
  },
  motion: {
    marqueeDuration:   { value: '24s' },
    blinkDuration:     { value: '0.9s' },
    transitionDuration: { value: '350ms' },
    slowTransition:     { value: '450ms' },
  },
  animations: {
    marquee:     { timing: 'linear', iteration: 'infinite' },
    cursorBlink: { timing: 'step-end', iteration: 'infinite' },
    cardFlip:    { duration: '0.8s' },
  },
}