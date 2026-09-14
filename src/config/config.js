export const IS_LOCAL = import.meta.env.DEV

const CLIENT = import.meta.env.VITE_CLIENT || 'demo'
const clientModules = import.meta.glob('./clients/*.js', { eager: true })
const clientPath = `./clients/${CLIENT}.js`
const INIT = clientModules[clientPath]?.default || []

export function getAllInit() {
  return INIT
}

export function getInit(config) {
  return INIT.find((i) => i.config === config).init ?? INIT.find((i) => i.config === config).default
}