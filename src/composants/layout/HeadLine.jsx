import '../../styles/HeadLine.css'

export default function HeadLine({ currentView, currentData }) {
  const marqueeText = `${currentData} · ${currentView}`

  return (
    <section className="headline-section">
      <h1 className="headline-title">{currentData}</h1>
      <p className="headline-subtitle">{currentView}</p>
      <div className="ds-marquee" aria-hidden="true">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i}>{marqueeText} · </span>
        ))}
      </div>
    </section>
  )
}