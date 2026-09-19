const CLIENT = import.meta.env.VITE_CLIENT || 'demo'
const clientModules = import.meta.glob(['./*.js', '!./index.js'], { eager: true })
const clientPath = `./${CLIENT}.js`

export const INIT = clientModules[clientPath]?.default || []