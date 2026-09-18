// Scène de la galerie People : des photos défilent sur des trajectoires
// circulaires, la source (liste d'URLs Cloudinary) est transmise en paramètre.
import Motion from './common/Motion'
import { circlesTrajectory } from '../../../utils/trajectory/circlesTrajectory'
import { useCircularMotion } from '../../../hooks/motion/useCircularMotion'

export default function CirclesMotion({ source }) {
  const trajectories = circlesTrajectory()

  if (!source || source.length === 0) return null

  return (
    <group>
      {trajectories.map((t, i) => (
        <Motion
          key={i}
          useMotion={useCircularMotion}
          motionArgs={[t.radius, t.speed, t.direction, t.phase]}
          length={t.length}
          width={t.width}
          index={i}
          source={source}
        />
      ))}
    </group>
  )
}