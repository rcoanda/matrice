
import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { getMotion } from '../../../../config/motionConfig'
import { getInit } from '../../../../config/config'
import { getLoading } from '../../../../config/loadingConfig'
import { getDesign } from '../../../../config/designConfig'
import { useArtworkLoader } from '../../../../hooks/loader/useArtworkLoader'
import HeadLine from '../../../layout/HeadLine'



export default function MotionScene({ motionKey, dataKey }) {
  const { artworks, dataItem, loading, progress } = useArtworkLoader(dataKey)
  const background = getDesign(getInit('designConfig')).colors.galleryLight.value

  const motionItem = getMotion(motionKey)
  const MotionComponent = motionItem ? motionItem.component : null
  const loadingItem = getLoading(getInit('loadingConfig'))
  const LoadingComponent = loadingItem ? loadingItem.component : null
  const source = useMemo(() => artworks.map((a) => a.image), [artworks])

  if (!motionKey || !dataKey || !source || source.length === 0) return null

  if (loading) {
    return LoadingComponent ? <LoadingComponent progress={progress} /> : null
  }

  return (
    <>
      <HeadLine currentView={motionItem?.label} currentData={dataItem?.label} />
      <Canvas camera={{ position: [0, 0, 14], fov: 50, up: [0, 1, 0] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <MotionComponent source={source} />
      </Canvas>
    </>
  )
}