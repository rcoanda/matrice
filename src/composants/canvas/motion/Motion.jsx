import { useViewMotion } from '../../../hooks/useViewMotion'

export default function Motion({ cameraZ = 5, children }) {
  const motionRef = useViewMotion(cameraZ)

  return <group ref={motionRef}>{children}</group>
}