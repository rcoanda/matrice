
import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { getMotionMode } from '../../../../config/motionConfig'
import { getInit } from '../../../../config/config'
import { getLoadingScreenType } from '../../../../config/loadingScreenConfig'
import { getDesignSystem } from '../../../../config/designSystemConfig'
import { useArtworkLoader } from '../../../../hooks/loader/useArtworkLoader'
import HeadLine from '../../../layout/HeadLine'



export default function MotionScene({ motionMode, dataSource, onSelect }) {
  const { artworks, dataSourceItem, loading, progress } = useArtworkLoader(dataSource)
  const background = getDesignSystem(getInit('designSystemConfig')).colors.galleryLight.value

  const motionItem = getMotionMode(motionMode)
  const MotionComponent = motionItem ? motionItem.component : null
  const loadingItem = getLoadingScreenType(getInit('loadingScreenConfig'))
  const LoadingComponent = loadingItem ? loadingItem.component : null
  const source = useMemo(() => artworks.map((a) => a.image), [artworks])

  if (!motionMode || !dataSource || !source || source.length === 0) return null

  if (loading) {
    return LoadingComponent ? <LoadingComponent progress={progress} /> : null
  }

  return (
    <>
      <HeadLine currentView={motionItem?.label} currentData={dataSourceItem?.label} />
      <Canvas camera={{ position: [0, 0, 14], fov: 50, up: [0, 1, 0] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <MotionComponent source={source} />
      </Canvas>
    </>
  )
}