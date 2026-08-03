const LANGUES = [
  { key: 'frKey', label: 'FR', path: '/lang/fr', codeHTML: 'fr' },
  { key: 'enKey', label: 'EN', path: '/lang/en', codeHTML: 'en' },
]

export function getAllLangues() {
  return LANGUES
}

export function getLangue(key) {
  return LANGUES.find((l) => l.key === key)
}
