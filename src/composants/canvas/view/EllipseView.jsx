import { useMemo } from 'react'
import { Vector3 } from 'three'
import View from './View'

export default function EllipseView({ artworks, onSelect }) {
  const positions = useMemo(() => {
    const count = artworks.length
    const rx = 6
    const rz = 3
    const pos = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      pos.push(new Vector3(
        rx * Math.cos(angle),
        Math.sin(angle * 2) * 0.8,
        rz * Math.sin(angle),
      ))
    }
    return pos
  }, [artworks.length])

  return (
    <View cameraZ={7} artworks={artworks} positions={positions} onSelect={onSelect} />
  )
}
