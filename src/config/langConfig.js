const LANGUES = [
  { key: 'frKey', label: 'FR', path: `${import.meta.env.BASE_URL}lang/fr`, codeHTML: 'fr' },
  { key: 'enKey', label: 'EN', path: `${import.meta.env.BASE_URL}lang/en`, codeHTML: 'en' },
]

export function getAllItems() {
  return LANGUES
}

export function getAllKeys() {
  return LANGUES.map((l) => l.key)
}

export function getItems(keys) {
  return keys ? LANGUES.filter((l) => keys.includes(l.key)) : LANGUES
}

export function getItem(key) {
  return LANGUES.find((l) => l.key === key)
}
