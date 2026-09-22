import { Text } from '@react-three/drei'
import SpriteView from './SpriteView'
import GlbView from './GlbView'

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
  ) : artWork.transformations?.length ? (
    artWork.transformations.map((Component, i) => <Component key={i} />)
  ) : (
    <group position={position} onClick={() => onSelect?.(artWork)}>
      <mesh>
        <planeGeometry args={[2.4, 3.2]} />
        <meshBasicMaterial color="#f4efe6" />
      </mesh>
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.3}
        color="#25231f"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        {artWork.collection}
      </Text>
    </group>
  )
}