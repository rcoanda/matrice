import { createElement } from 'react'
import ViewScene from '../composants/canvas/view/common/ViewScene'

export function createArtWorkItem({ id, collection = null, title = '', artist = '', date = '', place = '', url = null, type = null,
  views = null, dataKey = null }) {
  const viewList = views ? [...views] : []
  if (dataKey) {
    const ViewSceneView = (props) => createElement(ViewScene, { viewKey: 'gridKey', dataKey, ...props })
    if (!viewList.some((Component) => Component._dataKey === dataKey)) {
      ViewSceneView._dataKey = dataKey
      viewList.push(ViewSceneView)
    }
  }
  return {
    id,
    collection: collection || null,
    title: title || '',
    artist: artist || '',
    date: date || '',
    place: place || '',
    image: type === 'image' ? url : null,
    video: type === 'video' ? url : null,
    glb: type === 'glb' ? url : null,
    dataset: dataKey ?? null,
    views: viewList.length ? viewList : null,
  }
}