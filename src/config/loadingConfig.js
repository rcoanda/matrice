import Loading from '../composants/loading/Loading'

const LOADINGS = [
  { key: 'loadingKey', label: 'loading screen', component: Loading },
]

export function getAllLoadings() {
  return LOADINGS
}

export function getAllKeys() {
  return LOADINGS.map((l) => l.key)
}

export function getList(keys) {
  return keys ? LOADINGS.filter((l) => keys.includes(l.key)) : LOADINGS
}

export function getLoading(key) {
  return LOADINGS.find((l) => l.key === key)
}