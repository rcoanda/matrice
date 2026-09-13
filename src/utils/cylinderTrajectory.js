import { Vector3 } from 'three'

const DEFAULT_OPTIONS = {
  cols: 8,
  radius: 7,
  spacingY: 2,
  arc: Math.PI * 1.5,
  offset: -Math.PI * 0.75,
}

export function getCylinderTrajectory(count, options = {}) {
  const { cols, radius, spacingY, arc, offset } = { ...DEFAULT_OPTIONS, ...options }
  const actualCols = Math.min(cols, count)
  const rows = Math.ceil(count / actualCols)

  const positions = []
  for (let i = 0; i < count; i++) {
    const col = i % actualCols
    const row = Math.floor(i / actualCols)
    const angle = (col / Math.max(actualCols - 1, 1)) * arc + offset
    const yOff = (row - (rows - 1) / 2) * spacingY
    positions.push(new Vector3(
      radius * Math.sin(angle),
      yOff,
      -radius * Math.cos(angle) + radius * 0.2
    ))
  }
  return positions
}