import GlbView from './GlbView'
import CardView from './CardView'

export default function StaticView({ art, onSelect, css = 'gridview' }) {
  return art.image ? (
    <img src={art.image} alt={art.title || ''} />
  ) : art.video ? (
    <video src={art.video} autoPlay muted loop playsInline />
  ) : art.glb ? (
    <GlbView url={art.glb} className={`${css}-glb`} />
  ) : (
    <CardView dom className={`${css}-card`} collection={art.collection} onClick={() => onSelect?.(art)} />
  )
}