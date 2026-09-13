import { useMemo } from 'react'
import { getSphereHolder } from '../../utils/holder/sphereHolder'

export function useSphereHolder(artworks, options) {
  const positions = useMemo(
    () => getSphereHolder(artworks.length, options),
    [artworks.length, options]
  )
  return positions
}