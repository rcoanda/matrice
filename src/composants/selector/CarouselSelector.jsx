import { useState } from 'react'
import { getAllLangues } from '../../config/langConfig'
import '../../styles/CarouselSelector.css'

export default function CarouselSelector({
  viewModeOptions, viewMode, onViewModeChange,
  dataSourceOptions, dataSource, onDataSourceChange,
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lang, setLang] = useState('frKey')

  const langOptions = getAllLangues()

  const items = [
    { label: 'View', options: viewModeOptions, value: viewMode, onChange: onViewModeChange },
    { label: 'Data', options: dataSourceOptions, value: dataSource, onChange: onDataSourceChange },
    { label: 'Lang', options: langOptions, value: lang, onChange: setLang },
  ]

  const active = items[activeIndex]

  function goTo(index) {
    setActiveIndex(((index % 3) + 3) % 3)
  }

  return (
    <div className="carousel-overlay">
      <div className="carousel-track">
        <button className="carousel-arrow carousel-arrow-left" onClick={() => goTo(activeIndex - 1)}>
          ‹
        </button>

        {items.map((item, i) => {
          const offset = i - activeIndex
          const isActive = i === activeIndex
          const currentLabel = item.options.find((o) => o.key === item.value)?.label || item.value
          return (
            <div
              key={item.label}
              className={`carousel-card ${isActive ? 'carousel-card-active' : ''}`}
              onClick={() => setActiveIndex(i)}
              style={{
                transform: `translateX(${offset * 115}%) scale(${isActive ? 1 : 0.85})`,
                opacity: isActive ? 1 : 0.4,
                zIndex: isActive ? 2 : 1,
              }}
            >
              <span className="carousel-card-label">{item.label}</span>
              <span className="carousel-card-value">{currentLabel}</span>
            </div>
          )
        })}

        <button className="carousel-arrow carousel-arrow-right" onClick={() => goTo(activeIndex + 1)}>
          ›
        </button>
      </div>

      <div className="carousel-options">
        {active.options.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => active.onChange(key)}
            className={`carousel-option-btn ${active.value === key ? 'carousel-option-btn-active' : 'carousel-option-btn-inactive'}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
