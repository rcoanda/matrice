// Photo qui se déplace sur une trajectoire circulaire dans la galerie People.
// La texture (depuis Cloudinary) est chargée via usePhotoTexture.
import { useCircularMotion } from '../../../hooks/useCircularMotion'
import { usePhotoMeshTexture } from '../../../hooks/usePhotoMeshTexture'

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