import Motion from './Motion'

export default function CirclesMotion({ children }) {
  return <Motion cameraZ={6}>{children}</Motion>
}