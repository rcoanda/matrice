// Scène de la galerie : des photos défilent sur des trajectoires en lemniscate
// de même centre et de même taille, la source (liste d'URLs Cloudinary) est
// transmise en paramètre.
import Motion from './common/Motion'
import { lemniscatesTrajectory } from '../../../utils/trajectory/lemniscatesTrajectory'
import { useLemniscateMotion } from '../../../hooks/motion/useLemniscateMotion'

export default function LemniscatesMotion({ source }) {
  const trajectories = lemniscatesTrajectory()

  if (!source || source.length === 0) return null

  return (
    <group>
      {trajectories.map((t, i) => (
        <Motion
          key={i}
          useMotion={useLemniscateMotion}
          motionArgs={[t.size, t.speed, t.direction, t.rotation, t.phase]}
          length={t.length}
          width={t.width}
          index={i}
          source={source}
        />
      ))}
    </group>
  )
}