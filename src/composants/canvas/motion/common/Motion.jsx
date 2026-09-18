// Photo qui se déplace sur UNE trajectoire, la trajectoire étant pilotée par
// le hook de mouvement reçu en props (ex: useCircularMotion, useLemniscateMotion).
// moving photos
import { usePhotoMeshTexture } from '../../../../hooks/model/usePhotoMeshTexture'

export default function Motion({ useMotion, motionArgs, length, width, index, source }) {
  const ref = useMotion(...motionArgs)
  const texture = usePhotoMeshTexture(index, source)

  return (
    <mesh ref={ref}>
      <planeGeometry args={[length, width]} />
      {texture && <meshBasicMaterial map={texture} side={2} />}
    </mesh>
  )
}