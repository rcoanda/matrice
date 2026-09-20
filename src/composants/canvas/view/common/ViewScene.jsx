import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useViewScene } from '../../../../hooks/scene/useViewScene'
import HeadLine from '../../../layout/HeadLine'

function GalleryFallback() {
  return null
}

export default function ViewScene({ viewKey, dataKey, onSelect }) {
  const {
    artworks, dataItem, loading, progress,
    background, viewItem, ViewComponent, LoadingComponent,
  } = useViewScene({ viewKey, dataKey })

  if (!viewKey || !dataKey) return null
  if (!background) return null

  if (loading) {
    return LoadingComponent ? <LoadingComponent progress={progress} /> : null
  }

  return (
    <>
      <HeadLine currentView={viewItem?.label} currentData={dataItem?.label} />
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
