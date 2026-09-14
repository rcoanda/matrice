// Scène de la galerie People : des photos défilent sur des trajectoires
// circulaires, la source (liste d'URLs Cloudinary) est transmise en paramètre.
import Motion from './Motion'
import { circlesTrajectory } from '../../../utils/trajectory/circlesTrajectory'

export default function CirclesMotion({ source }) {
  const trajectories = circlesTrajectory()

  if (!source || source.length === 0) return null

  return (
    <group>
      {trajectories.map((props, i) => (
        <Motion key={i} {...props} index={i} source={source} />
      ))}
    </group>
  )
}