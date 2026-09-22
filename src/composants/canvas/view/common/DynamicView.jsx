import SpriteView from './SpriteView'
import GlbView from './GlbView'

export default function DynamicView({ artWork, position, onSelect }) {
  return artWork.image || artWork.video || artWork.text ? (
    <SpriteView
      key={artWork.id}
      artWork={artWork}
      position={position || [0, 0, 0]}
      onClick={() => onSelect?.(artWork)}
    />
  ) : artWork.glb ? (
    <GlbView
      key={artWork.id}
      scene
      url={artWork.glb}
      position={position || [0, 0, 0]}
      onClick={() => onSelect?.(artWork)}
    />
  ) : artWork.transformations?.length ? (
    artWork.transformations.map((Component, i) => <Component key={i} />)
  ) : null
}