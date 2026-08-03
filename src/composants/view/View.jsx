import { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, Vector3 } from 'three'

function ArtworkImage({ url, position, onClick }) {
  const texture = useLoader(TextureLoader, url)
  const aspect = texture.image ? texture.image.width / texture.image.height : 1
  const h = 1.6
  const w = h * Math.min(aspect, 1.8)

  return (
    <sprite position={position} onClick={onClick}>
      <spriteMaterial map={texture} transparent size={[w, h]} />
    </sprite>
  )
}

export default function View({ cameraZ, artworks, positions, onSelect }) {
  const groupRef = useRef()
  const cameraPos = useRef(new Vector3(0, 0.5, cameraZ))

  useFrame(({ camera }, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
    cameraPos.current.lerp(new Vector3(0, 0.5, cameraZ), 0.05)
    camera.position.copy(cameraPos.current)
    camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={groupRef}>
      {artworks.map((art, i) => (
        <ArtworkImage
          key={art.id}
          url={art.image}
          position={positions[i] || [0, 0, 0]}
          onClick={() => onSelect?.(art)}
        />
      ))}
    </group>
  )
}
