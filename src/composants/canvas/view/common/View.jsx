import DynamicView from './DynamicView'
import { useViewMotion } from '../../../../hooks/motion/useViewMotion'

export default function View({ cameraZ, artworks, positions, onSelect }) {
  const groupRef = useViewMotion(cameraZ)

  return (
    <group ref={groupRef}>
      {artworks.map((art, i) => (
        <DynamicView key={art.id} art={art} position={positions[i]} onSelect={onSelect} />
      ))}
    </group>
  )
}