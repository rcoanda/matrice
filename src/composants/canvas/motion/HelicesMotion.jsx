// Scène de la galerie : des photos défilent le long de deux trajectoires
// hélicoïdales verticales identiques (double hélice, brin d'ADN), formant un
// ruban continu : chaque photo est déformée selon la courbure et la torsion de
// l'hélice (voir useHeliceMotion), le bas de l'une étant collé au haut de la
// précédente. La source (liste d'URLs Cloudinary) est transmise en paramètre.
import Motion from './common/Motion'
import { helicesTrajectory } from '../../../utils/trajectory/helicesTrajectory'
import { useHeliceMotion } from '../../../hooks/motion/useHeliceMotion'

const SEGMENTS = 12

export default function HelicesMotion({ source }) {
  const trajectories = helicesTrajectory()

  if (!source || source.length === 0) return null

  return (
    <group>
      {trajectories.map((t, i) => (
        <Motion
          key={i}
          useMotion={useHeliceMotion}
          motionArgs={[
            t.radius, t.cVert, t.speed, t.direction,
            t.phase, t.period, t.offsetX, t.step,
            t.width, SEGMENTS,
          ]}
          length={t.length}
          width={t.width}
          segments={SEGMENTS}
          index={i}
          source={source}
        />
      ))}
    </group>
  )
}