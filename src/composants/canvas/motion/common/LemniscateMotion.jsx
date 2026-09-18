// Photo qui se déplace sur UNE trajectoire en lemniscate
// moving photos
import { useLemniscateMotion } from '../../../../hooks/motion/useLemniscateMotion'
import { usePhotoMeshTexture } from '../../../../hooks/model/usePhotoMeshTexture'

export default function LemniscateMotion({ size, speed, direction, rotation, phase, length, width, index, source }) {
  const ref = useLemniscateMotion(size, speed, direction, rotation, phase)
  const texture = usePhotoMeshTexture(index, source)

  return (
    <mesh ref={ref}>
      <planeGeometry args={[length, width]} />
      {texture && <meshBasicMaterial map={texture} side={2} />}
    </mesh>
  )
}
