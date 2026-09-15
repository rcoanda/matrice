import { useCylinderHolder } from '../../../hooks/holder/useCylinderHolder'
import View from './common/View'

export default function CylinderView({ artworks, onSelect }) {
  //calcule les positions sur géometrie
  const positions = useCylinderHolder(artworks)

  return (
    <View cameraZ={8} artworks={artworks} positions={positions} onSelect={onSelect} />
  )
}