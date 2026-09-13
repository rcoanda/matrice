// Design system « Neon » — variante sombre.
export default {
  key: 'neonKey',
  label: 'Neon',
  meta: {
    id: 'neon',
    name: 'Neon',
    description: 'Fond sombre & accents néon.',
    version: '1.0.0',
    tailwind: true,
  },
  colors: {
    gallery:        { value: '#0D0D14' },
    galleryLight:   { value: '#EDF2FF' },
    galleryMuted:   { value: '#0D0D1455' },
    galleryMuted2:  { value: '#0D0D1477' },
    accent:         { value: '#00E5FF' },
    cream:          { value: '#EDF2FF' },
  },
  font: {
    display: {
      families: ['Orbitron'],
      weights: '500;700;900',
      fallbacks: ['monospace'],
    },
    body: {
      families: ['IBM Plex Sans'],
      weights: '400;600',
      fallbacks: ['system-ui', 'sans-serif'],
    },
  },
  radius: {
    cards:   { value: '8px' },
    buttons: { value: '4px' },
    fields:  { value: '6px' },
  },
  spacing: {
    containerMaxWidth: { value: '68rem' },
  },
  motion: {
    marqueeDuration: { value: '12s' },
    blinkDuration:   { value: '1s' },
  },
  animations: {
    marquee:     { timing: 'linear', iteration: 'infinite' },
    cursorBlink: { timing: 'ease-in-out', iteration: 'infinite' },
    cardFlip:    { duration: '0.4s' },
  },
}