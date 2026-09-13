import { Vector3 } from 'three'

const DEFAULT_OPTIONS = {
  radius: 4,
}

export function getSphereHolder(count, options = {}) {
  const { radius } = { ...DEFAULT_OPTIONS, ...options }

  const positions = []
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i + 1) / count)
    const theta = Math.sqrt(count * Math.PI) * phi
    positions.push(new Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    ))
  }
  return positions
}