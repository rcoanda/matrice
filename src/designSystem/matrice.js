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
    gallery:        { value: '#313927' },
    galleryLight:   { value: '#E4D3B5' },
    galleryMuted:   { value: '#31392755' },
    galleryMuted2:  { value: '#31392777' },
    accent:         { value: '#313927' },
    cream:          { value: '#E4D3B5' },
  },
  font: {
    display: {
      families: ['Kalnia'],
      weights: '400;500;600',
      importUrl: 'https://fonts.googleapis.com/css2?family=Kalnia:wght@400;500;600&display=swap',
      fallbacks: ['Georgia', 'serif'],
    },
    body: {
      families: ['Almendra Sans'],
      weights: '400;700',
      importUrl: 'https://fonts.googleapis.com/css2?family=Almendra+Sans:wght@400;700&display=swap',
      fallbacks: ['system-ui', 'sans-serif'],
    },
  },
  radius: {
    cards:   { value: '18px' },
    buttons: { value: '9999px' },
    fields:  { value: '10px' },
  },
  spacing: {
    containerMaxWidth: { value: '72rem' },
  },
  motion: {
    marqueeDuration: { value: '18s' },
    blinkDuration:   { value: '1.2s' },
  },
  animations: {
    marquee:     { timing: 'linear', iteration: 'infinite' },
    cursorBlink: { timing: 'ease-in-out', iteration: 'infinite' },
    cardFlip:    { duration: '0.6s' },
  },
}