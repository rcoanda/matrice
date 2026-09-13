import { useMemo } from 'react'
import { getSphereTrajectory } from '../../utils/trajectory/sphereTrajectory'

export function useSphereTrajectory(artworks, options) {
  const positions = useMemo(
    () => getSphereTrajectory(artworks.length, options),
    [artworks.length, options]
  )
  return positions
}