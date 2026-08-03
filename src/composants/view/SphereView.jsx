import { useMemo } from 'react'
import { Vector3 } from 'three'
import View from './View'

export default function SphereView({ artworks, onSelect }) {
  const positions = useMemo(() => {
    const count = artworks.length
    const pos = []
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i + 1) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      const r = 4
      pos.push(new Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ))
    }
    return pos
  }, [artworks.length])

  return (
    <View cameraZ={5} artworks={artworks} positions={positions} onSelect={onSelect} />
  )
}
