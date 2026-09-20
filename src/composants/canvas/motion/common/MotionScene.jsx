
import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useTenant } from '../../../../hooks/tenant/useTenant'
import { useArtworkLoader } from '../../../../hooks/loader/useArtworkLoader'
import HeadLine from '../../../layout/HeadLine'



export default function MotionScene({ motionKey, dataKey }) {
  const { artworks, dataItem, loading, progress } = useArtworkLoader(dataKey)
  const { designItem, loadingItem, motionItems } = useTenant()

  const background = designItem?.file.colors.galleryLight.value
  const motionItem = motionItems?.find((i) => i.key === motionKey)
  const MotionComponent = motionItem ? motionItem.component : null
  const LoadingComponent = loadingItem ? loadingItem.component : null
  const source = useMemo(() => artworks.map((a) => a.image), [artworks])

  if (!motionKey || !dataKey || !source || source.length === 0) return null
  if (!background) return null

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