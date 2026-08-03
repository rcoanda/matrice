import '../styles/Overlay.css'
import CloseButton from './assets/CloseButton'

export default function Overlay({ artwork, onClose }) {
  if (!artwork) return null

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-window" onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} className="overlay-close" />
        <img className="overlay-image" src={artwork.image} alt={artwork.title || ''} />
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
