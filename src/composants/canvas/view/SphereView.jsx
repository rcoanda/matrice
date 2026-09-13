import { useSphereTrajectory } from '../../../hooks/trajectory/useSphereTrajectory'
import View from './View'

export default function SphereView({ artworks, onSelect }) {
  const positions = useSphereTrajectory(artworks)

  return (
    <View cameraZ={5} artworks={artworks} positions={positions} onSelect={onSelect} />
  )
}