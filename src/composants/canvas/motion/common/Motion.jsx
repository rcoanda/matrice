// Photo qui se déplace sur UNE trajectoire, la trajectoire étant pilotée par
// le hook de mouvement reçu en props (ex: useCircularMotion, useLemniscateMotion).
// moving photos
//cree le mouvement/le film (toutes les frames / le comportement) de la source (une liste des artwork) sur la trajectoire (points) deja calculées dans utils/trajectoire
import { usePhotoMeshTexture } from '../../../../hooks/texture/usePhotoMeshTexture'

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