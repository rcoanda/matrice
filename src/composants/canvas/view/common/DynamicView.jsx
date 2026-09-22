import SpriteView from './SpriteView'
import GlbView from './GlbView'
import CardView from './CardView'

export default function DynamicView({ artWork, position, onSelect }) {
  return artWork.image || artWork.video ? (
    <SpriteView
      key={artWork.id}
      image={artWork.image}
      video={artWork.video}
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
  ) : (
    <CardView
      key={artWork.id}
      collection={artWork.collection}
      position={position || [0, 0, 0]}
      onClick={() => onSelect?.(artWork)}
    />
  )
}