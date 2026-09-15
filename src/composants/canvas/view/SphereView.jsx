import { useSphereHolder } from '../../../hooks/holder/useSphereHolder'
import View from './common/View'

export default function SphereView({ artworks, onSelect }) {
  const positions = useSphereHolder(artworks)

  return (
    <View cameraZ={5} artworks={artworks} positions={positions} onSelect={onSelect} />
  )
}