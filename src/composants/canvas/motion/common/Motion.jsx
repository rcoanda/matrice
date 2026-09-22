// Texture d'un mesh : useMeshTexture retourne { texture, size } — photo
// (image/video) si l'artwork porte une URL, sinon texture du texte générée
// depuis artwork.collection.
import { useMeshTexture } from '../../../../hooks/texture/useMeshTexture'

export default function Motion({ useMotion, motionArgs, length, width, segments, index, artworks }) {
  const ref = useMotion(...motionArgs)
  const { texture } = useMeshTexture(index, artworks)
  const geometryArgs = segments ? [length, width, segments, 1] : [length, width]

  return (
    <mesh ref={ref}>
      <planeGeometry args={geometryArgs} />
      {texture && <meshBasicMaterial map={texture} side={2} />}
    </mesh>
  )
}