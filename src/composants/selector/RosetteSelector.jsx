import '../../styles/RosetteSelector.css'

export default function RosetteSelector({ label, options, value, onChange, className }) {
  const angleStep = options.length > 1 ? 360 / options.length : 0

  return (
    <div className={className || 'rosette-wrapper'}>
      <div className="rosette-center">
        {label && <h1 className="rosette-label">{label}</h1>}
      </div>
      <div className="rosette-ring">
        {options.map((opt, i) => {
          const angle = angleStep * i - 90
          const rad = (angle * Math.PI) / 180
          const r = 100
          const x = r * Math.cos(rad)
          const y = r * Math.sin(rad)
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onChange(opt.key)}
              className={`rosette-btn ${value === opt.key ? 'rosette-btn-active' : 'rosette-btn-inactive'}`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
