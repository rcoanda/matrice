import { useCylinderTrajectory } from '../../../hooks/trajectory/useCylinderTrajectory'
import View from './View'

export default function CylinderView({ artworks, onSelect }) {
  //calcule les positions sur la trajectoire
  const positions = useCylinderTrajectory(artworks)

  return (
    <View cameraZ={8} artworks={artworks} positions={positions} onSelect={onSelect} />
  )
}