import { useEllipseTrajectory } from '../../../hooks/trajectory/useEllipseTrajectory'
import View from './View'

export default function EllipseView({ artworks, onSelect }) {
  const positions = useEllipseTrajectory(artworks)

  return (
    <View cameraZ={7} artworks={artworks} positions={positions} onSelect={onSelect} />
  )
}