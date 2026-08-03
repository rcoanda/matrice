import '../styles/HeadLine.css'

export default function HeadLine({ currentView, currentData }) {
  return (
    <section className="headline-section">
      <h1 className="headline-title">{currentData}</h1>
      <p className="headline-subtitle">{currentView}</p>
    </section>
  )
}
