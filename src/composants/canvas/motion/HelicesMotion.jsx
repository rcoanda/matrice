// Scène de la galerie : des photos défilent le long de deux trajectoires
// hélicoïdales verticales identiques (double hélice, brin d'ADN), posées sans
// espace entre elles, la source (liste d'URLs Cloudinary) est transmise en paramètre.
import Motion from './common/Motion'
import { helicesTrajectory } from '../../../utils/trajectory/helicesTrajectory'
import { useHeliceMotion } from '../../../hooks/motion/useHeliceMotion'

export default function HelicesMotion({ source }) {
  const trajectories = helicesTrajectory()

  if (!source || source.length === 0) return null

  return (
    <group>
      {trajectories.map((t, i) => (
        <Motion
          key={i}
          useMotion={useHeliceMotion}
          motionArgs={[t.radius, t.cVert, t.speed, t.direction, t.phase]}
          length={t.length}
          width={t.width}
          index={i}
          source={source}
        />
      ))}
    </group>
  )
}