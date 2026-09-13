import { useMemo } from 'react'
import { getCylinderTrajectory } from '../utils/cylinderTrajectory'

export function useCylinderTrajectory(artworks, options) {
  const positions = useMemo(
    () => getCylinderTrajectory(artworks.length, options),
    [artworks.length, options]
  )
  return positions
}