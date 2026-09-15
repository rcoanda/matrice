import { useEllipseHolder } from '../../../hooks/holder/useEllipseHolder'
import View from './common/View'

export default function EllipseView({ artworks, onSelect }) {
  const positions = useEllipseHolder(artworks)

  return (
    <View cameraZ={7} artworks={artworks} positions={positions} onSelect={onSelect} />
  )
}