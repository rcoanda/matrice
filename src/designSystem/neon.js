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
    gallery:         { value: '#0D0D14' },
    galleryLight:    { value: '#EDF2FF' },
    galleryMuted:    { value: '#0D0D1455' },
    galleryMuted2:   { value: '#0D0D1477' },
    accent:          { value: '#00E5FF' },
    cream:           { value: '#EDF2FF' },
    surface:         { value: '#14141E' },
    'on-accent':     { value: '#0D0D14' },
    backdrop:        { value: 'rgba(0, 0, 0, 0.75)' },
    'hover-overlay': { value: 'rgba(255, 255, 255, 0.3)' },
    'subtle-overlay':{ value: 'rgba(255, 255, 255, 0.1)' },
    'faint-overlay': { value: 'rgba(255, 255, 255, 0.05)' },
    'hero-vignette': { value: 'rgba(0, 229, 255, 0.15)' },
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
  typography: {
    sizes: {
      hero:      { value: '2.25rem' },
      display:   { value: '2rem' },
      featured:  { value: '1.75rem' },
      lead:      { value: '1.125rem' },
      cardTitle: { value: '1.1rem' },
      base:      { value: '1rem' },
      small:     { value: '0.875rem' },
      xsmall:    { value: '0.75rem' },
      micro:     { value: '0.7rem' },
    },
    tracking: {
      tight: { value: '0.05em' },
      label: { value: '0.1em' },
      wide:  { value: '0.2em' },
      wider: { value: '0.25em' },
    },
  },
  radius: {
    cards:   { value: '8px' },
    buttons: { value: '4px' },
    fields:  { value: '6px' },
    md:      { value: '4px' },
    sm:      { value: '2px' },
  },
  shadow: {
    card: { value: '0 10px 30px rgba(0, 0, 0, 0.5)' },
    lift: { value: '0 8px 20px rgba(0, 0, 0, 0.5)' },
  },
  spacing: {
    containerMaxWidth: { value: '68rem' },
  },
  motion: {
    marqueeDuration:   { value: '12s' },
    blinkDuration:     { value: '1s' },
    transitionDuration: { value: '200ms' },
    slowTransition:     { value: '300ms' },
  },
  animations: {
    marquee:     { timing: 'linear', iteration: 'infinite' },
    cursorBlink: { timing: 'ease-in-out', iteration: 'infinite' },
    cardFlip:    { duration: '0.4s' },
  },
}