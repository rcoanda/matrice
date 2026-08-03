import { useMemo } from 'react'
import { Vector3 } from 'three'
import View from './View'

export default function CylinderView({ artworks, onSelect }) {
  const positions = useMemo(() => {
    const count = artworks.length
    const cols = Math.min(8, count)
    const rows = Math.ceil(count / cols)
    const r = 7
    const spacingY = 2
    const pos = []
    for (let i = 0; i < count; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)
      const angle = (col / Math.max(cols - 1, 1)) * Math.PI * 1.5 - Math.PI * 0.75
      const yOff = (row - (rows - 1) / 2) * spacingY
      pos.push(new Vector3(
        r * Math.sin(angle),
        yOff,
        -r * Math.cos(angle) + r * 0.2
      ))
    }
    return pos
  }, [artworks.length])

  return (
    <View cameraZ={8} artworks={artworks} positions={positions} onSelect={onSelect} />
  )
}
