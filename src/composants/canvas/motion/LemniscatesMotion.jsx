// Scène de la galerie : des photos défilent sur des trajectoires en lemniscate
// de même centre, la source (liste d'URLs Cloudinary) est transmise en paramètre.
import LemniscateMotion from './common/LemniscateMotion'
import { lemniscatesTrajectory } from '../../../utils/trajectory/lemniscatesTrajectory'

export default function LemniscatesMotion({ source }) {
  const trajectories = lemniscatesTrajectory()

  if (!source || source.length === 0) return null

  return (
    <group>
      {trajectories.map((props, i) => (
        <LemniscateMotion key={i} {...props} index={i} source={source} />
      ))}
    </group>
  )
}