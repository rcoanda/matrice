import { useMemo } from 'react'
import { getEllipseTrajectory } from '../../utils/trajectory/ellipseTrajectory'

export function useEllipseTrajectory(artworks, options) {
  const positions = useMemo(
    () => getEllipseTrajectory(artworks.length, options),
    [artworks.length, options]
  )
  return positions
}