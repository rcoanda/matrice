import { createElement } from 'react'
import MotionScene from '../composants/canvas/motion/common/MotionScene'
import ViewScene from '../composants/canvas/view/common/ViewScene'
import { createArtWorkItem } from './createArtWorkItem'

export function createMetaArtWorkItem({ id, collection = null, text = null, dataKey = null, viewKey = null, motionKey = null }) {
  //projet création des metadatas  en cours
  // Sans dataKey : simple artwork, sans vue embarquée
  if (!dataKey) {
    return createArtWorkItem({ id, collection, text })
  }

  // Avec dataKey : vue (viewKey) et motion (motionKey) de la source jointes à l'artwork
  const transformations = []

  if (viewKey) {
    const ViewSceneView = (props) => createElement(ViewScene, { viewKey, dataKey, ...props })
    if (!transformations.some((Component) => Component._viewKey === viewKey)) {
      ViewSceneView._viewKey = viewKey
      transformations.push(ViewSceneView)
    }
  }

  if (motionKey) {
    const MotionSceneView = (props) => createElement(MotionScene, { motionKey, dataKey, ...props })
    if (!transformations.some((Component) => Component._motionKey === motionKey)) {
      MotionSceneView._motionKey = motionKey
      transformations.push(MotionSceneView)
    }
  }

  return createArtWorkItem({ id, collection, transformations })
}