import { useMemo } from 'react'
import { getEllipseHolder } from '../../utils/holder/ellipseHolder'

export function useEllipseHolder(artworks, options) {
  const positions = useMemo(
    () => getEllipseHolder(artworks.length, options),
    [artworks.length, options]
  )
  return positions
}