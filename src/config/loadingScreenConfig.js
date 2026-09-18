import LoadingScreen from '../composants/loading/LoadingScreen'

const LOADING_SCREEN_TYPES = [
  { key: 'loadingScreenKey', label: 'loading screen', component: LoadingScreen },
]

export function getAllLoadingScreenTypes() {
  return LOADING_SCREEN_TYPES
}

export function getAllKeys() {
  return LOADING_SCREEN_TYPES.map((l) => l.key)
}

export function getList(keys) {
  return keys ? LOADING_SCREEN_TYPES.filter((l) => keys.includes(l.key)) : LOADING_SCREEN_TYPES
}

export function getLoadingScreenType(key) {
  return LOADING_SCREEN_TYPES.find((l) => l.key === key)
}