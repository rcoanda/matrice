// riannecorvalis artiste : img, video, glb
//selector - julis
const INIT2 = [
    { config: 'langConfig', list: null, default: 'frKey', init: 'frKey' },
    { config: 'motionConfig', list: [], default: null, init: null },
    { config: 'viewConfig', list: null, default: null, init: 'gridKey' },
    { config: 'dataConfig', list: ['natureKey', 'karnakKey', 'peopleKey', 'cosmosKey', 'astroKey'], default: null, init: null },
    { config: 'selectorConfig', list: null, default: null, init: 'ellipseKey' },
    { config: 'overlayConfig', list: null, default: 'overlayKey', init: null },
    { config: 'transitionConfig', list: null, default: 'transitionKey', init: null },
    { config: 'heroConfig', list: null, default: null, init: null },
    { config: 'designSystemConfig', list: null, default: 'matriceKey', init: null },
]

//hero et selector - corentis
const INIT = [
    { config: 'langConfig', list: null, default: 'frKey', init: 'frKey' },
    { config: 'motionConfig', list: [], default: null, init: null },
    { config: 'viewConfig', list: ['gridKey', 'listKey'], default: null, init: null },
    { config: 'dataConfig', list: ['natureKey', 'karnakKey', 'peopleKey', 'cosmosKey', 'astroKey'], default: null, init: 'natureKey' },
    { config: 'selectorConfig', list: null, default: null, init: 'btnKey' },
    { config: 'overlayConfig', list: null, default: 'overlayKey', init: null },
    { config: 'transitionConfig', list: null, default: 'transitionKey', init: null },
    { config: 'heroConfig', list: null, default: null, init: 'circlesKey' },
    { config: 'designSystemConfig', list: null, default: 'julisKey', init: null },
]
export default INIT