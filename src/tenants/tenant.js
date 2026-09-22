const TENANT = import.meta.env.VITE_CLIENT || 'demo'
const tenantRegistry = `./${TENANT}Registry.js`
const load = import.meta.glob(['./*.js', '!./tenant.js'], { eager: true })

//les ressources du tenant courant paramétré dans .env 
export const TENANT_REGISTRY = load[tenantRegistry]?.default || []