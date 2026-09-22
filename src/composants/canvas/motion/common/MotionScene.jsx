import { Canvas } from '@react-three/fiber'
import { useContextBridge } from '@react-three/drei'
import { useMotionScene } from '../../../../hooks/scene/useMotionScene'
import { LanguageContext } from '../../../../providers/LanguageContext'
import { SelectionContext } from '../../../../providers/SelectionContext'
import HeadLine from '../../../layout/HeadLine'

export default function MotionScene({ motionKey, dataKey }) {
  const Bridge = useContextBridge(LanguageContext, SelectionContext)
  const {
    artworks, dataItem, motionItem, MotionComponent, LoadingComponent, background, progress, loading,
  } = useMotionScene({ motionKey, dataKey })

  if (!motionKey || !dataKey || !artworks || artworks.length === 0) return null
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
        <Bridge>
          <MotionComponent artworks={artworks} />
        </Bridge>
      </Canvas>
    </>
  )
}