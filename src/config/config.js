export const IS_LOCAL = import.meta.env.DEV

const CLIENT = import.meta.env.VITE_CLIENT || 'demo'
const clientModules = import.meta.glob('./clients/*.js', { eager: true })
const clientPath = `./clients/${CLIENT}.js`
const INIT = clientModules[clientPath]?.default || []

export function getAllInit() {
  return INIT
}

export function getInit(config) {
  //retourn un Key
  const item = INIT.find((i) => i.config === config)
  return item ? item.init ?? item.default : undefined
}