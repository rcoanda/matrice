import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { getViewMode } from '../../../../config/viewConfig'
import { getInit } from '../../../../config/config'
import { getDesignSystem } from '../../../../config/designSystemConfig'
import { useArtworkLoader } from '../../../../hooks/loader/useArtworkLoader'
import LoadingScreen from '../../../effects/LoadingScreen'
import HeadLine from '../../../layout/HeadLine'

function GalleryFallback() {
  return null
}

export default function ViewScene({ viewModeKey, dataSourceKey, onSelect }) {
  const { artworks, dataSourceItem, loading, progress } = useArtworkLoader(dataSourceKey)
  const background = getDesignSystem(getInit('designSystemConfig')).colors.galleryLight.value

  const viewModeItem = getViewMode(viewModeKey)
  const ViewComponent = viewModeItem ? viewModeItem.component : null

  if (!viewModeKey || !dataSourceKey) return null

  if (loading) {
    return <LoadingScreen progress={progress} />
  }

  return (
    <>
      <HeadLine currentView={viewModeItem?.label} currentData={dataSourceItem?.label} />
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={[background]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <Suspense fallback={<GalleryFallback />}>
          {/* affichage artworks */}
          {ViewComponent && <ViewComponent artworks={artworks} onSelect={onSelect} />}
        </Suspense>
      </Canvas>
    </>
  )
}
