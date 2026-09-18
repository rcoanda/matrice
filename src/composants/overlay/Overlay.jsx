import '../../styles/Overlay.css'
import CloseButton from '../buttons/CloseButton'
import GlbView from '../canvas/view/common/GlbView'

export default function Overlay({ artwork, onClose }) {
  if (!artwork) return null

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-window" onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} className="overlay-close" />
        {artwork.image ? (
          <img className="overlay-image" src={artwork.image} alt={artwork.title || ''} />
        ) : artwork.video ? (
          <video className="overlay-media" src={artwork.video} autoPlay loop controls playsInline />
        ) : artwork.glb ? (
          <GlbView url={artwork.glb} className="overlay-glb" orbit />
        ) : null}
        <div className="overlay-info">
          {artwork.title && <h2>{artwork.title}</h2>}
          {artwork.artist && <p>{artwork.artist}</p>}
          {artwork.date && <p>{artwork.date}</p>}
          {artwork.place && <p>{artwork.place}</p>}
        </div>
      </div>
    </div>
  )
}