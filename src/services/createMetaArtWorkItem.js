import { createElement } from 'react'
import MotionScene from '../composants/canvas/motion/common/MotionScene'
import { createArtWorkItem } from './createArtWorkItem'

export function createMetaArtWorkItem({ id, collection = null, text = null, title = '', artist = '', date = '', place = '',
  url = null,
  type = null, dataKey = null }) {

  // Sans dataKey : simple artwork, sans vue embarquée
  if (!dataKey) {
    return createArtWorkItem({ id, collection, text, title, artist, date, place, url, type, transformations: null })
  }

  // Avec dataKey : vue (grid) et motion (circles) de la source jointes à l'artwork
  const transformations = []
  /*
  const ViewSceneView = (props) => createElement(ViewScene, { viewKey: 'gridKey', dataKey, ...props })
  if (!transformations.some((Component) => Component._dataKey === dataKey)) {
    ViewSceneView._dataKey = dataKey
    transformations.push(ViewSceneView)
  }
    
  const MotionSceneView = (props) => createElement(MotionScene, { motionKey: 'circlesKey', dataKey, ...props })
  if (!transformations.some((Component) => Component._motionKey === 'circlesKey')) {
    MotionSceneView._motionKey = 'circlesKey'
    transformations.push(MotionSceneView)
  }
*/
  return createArtWorkItem({ id, collection, text, title, artist, date, place, url, type, transformations: transformations })
}
