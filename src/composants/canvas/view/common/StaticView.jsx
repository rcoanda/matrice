import GlbView from './GlbView'
import CardView from './CardView'

export default function StaticView({ artWork, onSelect, css = 'gridview' }) {
  return artWork.image ? (
    <img src={artWork.image} alt={artWork.title || ''} />
  ) : artWork.video ? (
    <video src={artWork.video} autoPlay muted loop playsInline />
  ) : artWork.glb ? (
    <GlbView url={artWork.glb} className={`${css}-glb`} />
  ) : artWork.views?.length ? (
    artWork.views.map((Component, i) => <Component key={i} />)
  ) : (
    <CardView dom className={`${css}-card`} collection={artWork.collection} onClick={() => onSelect?.(artWork)} />
  )
}