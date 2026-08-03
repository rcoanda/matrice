import { useEffect, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { getViewMode } from '../config/viewConfig'
import { getDataSource } from '../config/dataConfig'
import LoadingScreen from './LoadingScreen'
import HeadLine from './HeadLine'

function GalleryFallback() {
  return null
}

export default function Scene({ viewMode, dataSource, onSelect }) {
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  const viewModeItem = getViewMode(viewMode)
  const ViewComponent = viewModeItem ? viewModeItem.component : null
  const dataSourceItem = getDataSource(dataSource)

  useEffect(() => {
    if (!dataSourceItem) return
    setLoading(true)
    setProgress(10)

    const load = async () => {
      const data = await dataSourceItem.loader()
      setProgress(100)
      setArtworks(data)
      setTimeout(() => setLoading(false), 300)
    }
    load()
  }, [dataSource])

  if (!viewMode || !dataSource) return null

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
        <color attach="background" args={['#E4D3B5']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <Suspense fallback={<GalleryFallback />}>
        //affichage artworks
          {ViewComponent && <ViewComponent artworks={artworks} onSelect={onSelect} />}
        </Suspense>
      </Canvas>
    </>
  )
}
