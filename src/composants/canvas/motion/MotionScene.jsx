
import { Canvas } from '@react-three/fiber'
import { getMotionMode } from '../../../config/motionConfig'
import { getInit } from '../../../config/config'
import { getDesignSystem } from '../../../config/designSystemConfig'
import { useArtworkLoader } from '../../../hooks/useArtworkLoader'
import LoadingScreen from '../../effects/LoadingScreen'
import HeadLine from '../../layout/HeadLine'



export default function MotionScene({ motionMode, viewMode, dataSource, onSelect }) {
  const { artworks, dataSourceItem, loading, progress } = useArtworkLoader(dataSource)
  const background = getDesignSystem(getInit('designSystemConfig')).colors.galleryLight.value

  const motionItem = getMotionMode(motionMode)
  const MotionComponent = motionItem ? motionItem.component : null


  if (!motionMode || !dataSource) return null

  if (loading) {
    return <LoadingScreen progress={progress} />
  }

  return (
    <>
      <HeadLine currentView={motionItem?.label} currentData={dataSourceItem?.label} />
      <Canvas camera={{ position: [0, 5, 7], fov: 50, up: [0, 1, 0] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <MotionComponent artworks={artworks} source={dataSourceItem?.file ? `data/${dataSourceItem.file}` : undefined} onSelect={onSelect} />
      </Canvas>
    </>
  )
}