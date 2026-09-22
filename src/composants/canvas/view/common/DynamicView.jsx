import SpriteView from './SpriteView'
import GlbView from './GlbView'
import CardView from './CardView'

export default function DynamicView({ art, position, onSelect }) {
  return art.image || art.video ? (
    <SpriteView
      key={art.id}
      image={art.image}
      video={art.video}
      position={position || [0, 0, 0]}
      onClick={() => onSelect?.(art)}
    />
  ) : art.glb ? (
    <GlbView
      key={art.id}
      scene
      url={art.glb}
      position={position || [0, 0, 0]}
      onClick={() => onSelect?.(art)}
    />
  ) : (
    <CardView
      key={art.id}
      collection={art.collection}
      position={position || [0, 0, 0]}
      onClick={() => onSelect?.(art)}
    />
  )
}