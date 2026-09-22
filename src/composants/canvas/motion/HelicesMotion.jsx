// Scène de la galerie : des photos défilent le long de deux trajectoires
// hélicoïdales verticales identiques (double hélice, brin d'ADN), formant un
// ruban continu : chaque photo est déformée selon la courbure et la torsion de
// l'hélice (voir useHeliceMotion), le bas de l'une étant collé au haut de la
// précédente. Les artworks (liste d'URLs Cloudinary) sont transmis en paramètre.
import Motion from './common/Motion'
import { helicesTrajectory } from '../../../utils/trajectory/helicesTrajectory'
import { useHeliceMotion } from '../../../hooks/motion/useHeliceMotion'

const SEGMENTS = 12

export default function HelicesMotion({ artworks }) {
  const trajectories = helicesTrajectory()

  if (!artworks || artworks.length === 0) return null

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
          artworks={artworks}
        />
      ))}
    </group>
  )
}