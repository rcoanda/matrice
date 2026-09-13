import { useMemo } from 'react'
import { getCylinderHolder } from '../../utils/holder/cylinderHolder'

export function useCylinderHolder(artworks, options) {
  const positions = useMemo(
    () => getCylinderHolder(artworks.length, options),
    [artworks.length, options]
  )
  return positions
}