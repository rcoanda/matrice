// Design system « Matrice » — le design actuel du projet.
export default {
  key: 'matriceKey',
  label: 'Matrice',
  meta: {
    id: 'matrice',
    name: 'Matrice',
    description: 'Vert olive & beige, typographies Kalnia / Almendra Sans.',
    version: '1.0.0',
    tailwind: true,
  },
  colors: {
    gallery:         { value: '#313927' },
    galleryLight:    { value: '#E4D3B5' },
    galleryMuted:    { value: '#31392755' },
    galleryMuted2:   { value: '#31392777' },
    accent:          { value: '#313927' },
    cream:           { value: '#E4D3B5' },
    surface:         { value: '#fffdf7' },
    'on-accent':     { value: '#000000' },
    backdrop:        { value: 'rgba(0, 0, 0, 0.6)' },
    'hover-overlay': { value: 'rgba(255, 255, 255, 0.3)' },
    'subtle-overlay':{ value: 'rgba(255, 255, 255, 0.1)' },
    'faint-overlay': { value: 'rgba(255, 255, 255, 0.05)' },
    'hero-vignette': { value: 'rgba(49, 57, 39, 0.18)' },
  },
  font: {
    display: {
      families: ['Kalnia'],
      weights: '400;500;600',
      fallbacks: ['Georgia', 'serif'],
    },
    body: {
      families: ['Almendra Sans'],
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
    cards:   { value: '18px' },
    buttons: { value: '9999px' },
    fields:  { value: '10px' },
    md:      { value: '12px' },
    sm:      { value: '2px' },
  },
  shadow: {
    card: { value: '0 10px 30px rgba(0, 0, 0, 0.25)' },
    lift: { value: '0 8px 20px rgba(0, 0, 0, 0.25)' },
  },
  spacing: {
    containerMaxWidth: { value: '72rem' },
  },
  motion: {
    marqueeDuration:   { value: '18s' },
    blinkDuration:     { value: '1.2s' },
    transitionDuration: { value: '300ms' },
    slowTransition:     { value: '400ms' },
  },
  animations: {
    marquee:     { timing: 'linear', iteration: 'infinite' },
    cursorBlink: { timing: 'ease-in-out', iteration: 'infinite' },
    cardFlip:    { duration: '0.6s' },
  },
}