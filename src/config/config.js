export const IS_LOCAL = import.meta.env.DEV

const INIT = [
  { config: 'langConfig', default: 'frKey', init: null },
  { config: 'motionConfig', default: 'circlesKey', init: null },
  { config: 'viewConfig', default: null, init: null },
  { config: 'dataConfig', default: null, init: null },
  { config: 'selectorConfig', default: 'btnKey', init: null },
  { config: 'heroConfig', default: 'cameraKey', init: null },
  { config: 'designSystemConfig', default: 'matriceKey', init: null },
]

export function getAllInit() {
  return INIT
}

export function getInit(config) {
  return INIT.find((i) => i.config === config).init ?? INIT.find((i) => i.config === config).default
}
