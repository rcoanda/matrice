//les ressources du tenant 'riannecorvalis'
// riannecorvalis artiste : img, video, glb
//selector - julis
const TENANT_REGISTRY_OLD = [
    { registry: 'langRegistry', keys: null, key: 'frKey' },
    { registry: 'motionRegistry', keys: [], key: null },
    { registry: 'viewRegistry', keys: null, key: 'gridKey' },
    { registry: 'dataRegistry', keys: ['natureKey', 'karnakKey', 'peopleKey', 'cosmosKey', 'astroKey'], key: null },
    { registry: 'selectorRegistry', keys: null, key: 'ellipseKey' },
    { registry: 'overlayRegistry', keys: null, key: 'overlayKey' },
    { registry: 'transitionRegistry', keys: null, key: 'transitionKey' },
    { registry: 'loadingRegistry', keys: null, key: 'loadingKey' },
    { registry: 'heroRegistry', keys: null, key: null },
    { registry: 'designRegistry', keys: null, key: 'matriceKey' },
]

//hero et selector - corentis
const TENANT_REGISTRY = [
    { registry: 'langRegistry', keys: null, key: 'frKey' },
    { registry: 'headerRegistry', keys: null, key: 'headerKey' },
    { registry: 'motionRegistry', keys: [], key: null },
    { registry: 'viewRegistry', keys: ['gridKey', 'listKey'], key: null },
    { registry: 'dataRegistry', keys: ['natureKey', 'karnakKey', 'peopleKey', 'cosmosKey', 'astroKey'], key: 'natureKey' },
    { registry: 'selectorRegistry', keys: null, key: 'btnKey' },
    { registry: 'overlayRegistry', keys: null, key: 'overlayKey' },
    { registry: 'transitionRegistry', keys: null, key: 'transitionKey' },
    { registry: 'loadingRegistry', keys: null, key: 'loadingKey' },
    { registry: 'heroRegistry', keys: null, key: 'circlesKey' },
    { registry: 'designRegistry', keys: null, key: 'julisKey' },
]
export default TENANT_REGISTRY