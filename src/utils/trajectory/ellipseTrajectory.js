import { Vector3 } from 'three'

const DEFAULT_OPTIONS = {
  rx: 6,
  rz: 3,
  amplitudeY: 0.8,
  frequencyY: 2,
}

export function getEllipseTrajectory(count, options = {}) {
  const { rx, rz, amplitudeY, frequencyY } = { ...DEFAULT_OPTIONS, ...options }

  const positions = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    positions.push(new Vector3(
      rx * Math.cos(angle),
      Math.sin(angle * frequencyY) * amplitudeY,
      rz * Math.sin(angle),
    ))
  }
  return positions
}