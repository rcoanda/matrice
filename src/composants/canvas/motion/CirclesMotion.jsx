// Scène de la galerie People : des photos défilent sur des trajectoires
// circulaires, la source des photos (people.json) est transmise en paramètre.
import Motion from './Motion'
import { circlesTrajectory } from '../../../utils/trajectory/circlesTrajectory'

const PEOPLE_SOURCE = 'data/motion/people.json'

export default function CirclesMotion() {
  const trajectories = circlesTrajectory()

  return (
    <group>
      {trajectories.map((props, i) => (
        <Motion key={i} {...props} index={i} source={PEOPLE_SOURCE} />
      ))}
    </group>
  )
}