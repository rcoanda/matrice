// Photos qui se déplace sur UNE trajectoire circulaire
// moving photos
import { useCircularMotion } from '../../../hooks/useCircularMotion'
import { usePhotoMeshTexture } from '../../../hooks/texture/usePhotoMeshTexture'

export default function Motion({ radius, speed, direction, phase, length, width, index, source }) {
  const ref = useCircularMotion(radius, speed, direction, phase)
  const texture = usePhotoMeshTexture(index, source)

  return (
    <mesh ref={ref}>
      <planeGeometry args={[length, width]} />
      {texture && <meshBasicMaterial map={texture} side={2} />}
    </mesh>
  )
}