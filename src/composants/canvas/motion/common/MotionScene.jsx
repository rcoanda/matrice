import { Canvas } from '@react-three/fiber'
import { useMotionScene } from '../../../../hooks/scene/useMotionScene'
import HeadLine from '../../../layout/HeadLine'

export default function MotionScene({ motionKey, dataKey }) {
  const {
    artWorksImage, dataItem, motionItem, MotionComponent, LoadingComponent, background, progress, loading,
  } = useMotionScene({ motionKey, dataKey })

  if (!motionKey || !dataKey || !artWorksImage || artWorksImage.length === 0) return null
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
        <MotionComponent source={artWorksImage} />
      </Canvas>
    </>
  )
}