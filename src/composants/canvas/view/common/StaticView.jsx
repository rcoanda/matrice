import GlbView from './GlbView'

export default function StaticView({ artWork, onSelect, css = 'gridview' }) {
  return artWork.image ? (
    <img src={artWork.image} alt={artWork.title || ''} />
  ) : artWork.video ? (
    <video src={artWork.video} autoPlay muted loop playsInline />
  ) : artWork.glb ? (
    <GlbView url={artWork.glb} className={`${css}-glb`} />
  ) : artWork.transformations?.length ? (
    artWork.transformations.map((Component, i) => <Component key={i} />)
  ) : (
    <div className={`${css}-card`} onClick={() => onSelect?.(artWork)}>
      {artWork.collection}
    </div>
  )
}