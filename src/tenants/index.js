const TENANT = import.meta.env.VITE_CLIENT || 'demo'
const tenantModules = import.meta.glob(['./*.js', '!./index.js'], { eager: true })
const tenantPath = `./${TENANT}.js`

export const INIT = tenantModules[tenantPath]?.default || []