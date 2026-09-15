// riannecorvalis artiste : img, video, glb

const INIT = [
    { config: 'langConfig', list: null, default: 'frKey', init: 'frKey' },
    { config: 'motionConfig', list: [], default: null, init: null },// utilisé comme hero
    //{ config: 'motionConfig', list: [], default: null, init: 'circlesKey' },// utilisé comme hero
    { config: 'viewConfig', list: ['gridKey', 'listKey'], default: null, init: null },
    { config: 'dataConfig', list: null, default: null, init: 'natureKey' }, //toutes les sources
    { config: 'selectorConfig', list: null, default: 'btnKey', init: null },
    { config: 'heroConfig', list: null, default: null, init: 'circlesnatureKey' },
    { config: 'designSystemConfig', list: null, default: 'matriceKey', init: null },
]

export default INIT