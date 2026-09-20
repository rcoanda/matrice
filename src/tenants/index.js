const TENANT = import.meta.env.VITE_CLIENT || 'demo'
const tenantRegistries = import.meta.glob(['./*.js', '!./index.js'], { eager: true })
const tenantPath = `./${TENANT}.js`

export const RESOURCES = tenantRegistries[tenantPath]?.default || []