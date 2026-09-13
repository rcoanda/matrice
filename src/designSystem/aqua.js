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
    gallery:        { value: '#1B3A4B' },
    galleryLight:   { value: '#F1E9D6' },
    galleryMuted:   { value: '#1B3A4B55' },
    galleryMuted2:  { value: '#1B3A4B77' },
    accent:         { value: '#1B3A4B' },
    cream:          { value: '#F1E9D6' },
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
  radius: {
    cards:   { value: '24px' },
    buttons: { value: '12px' },
    fields:  { value: '16px' },
  },
  spacing: {
    containerMaxWidth: { value: '80rem' },
  },
  motion: {
    marqueeDuration: { value: '24s' },
    blinkDuration:   { value: '0.9s' },
  },
  animations: {
    marquee:     { timing: 'linear', iteration: 'infinite' },
    cursorBlink: { timing: 'step-end', iteration: 'infinite' },
    cardFlip:    { duration: '0.8s' },
  },
}