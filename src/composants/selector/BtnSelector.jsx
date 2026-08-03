import '../../styles/BtnSelector.css'

function renderButtons(options, value, onChange) {
  return options.map(({ key, label }) => (
    <button
      key={key}
      type="button"
      onClick={() => onChange(key)}
      className={`selector-btn ${value === key ? 'selector-btn-active' : 'selector-btn-inactive'}`}
      onMouseEnter={(e) => e.currentTarget.classList.add('selector-btn-hover')}
      onMouseLeave={(e) => e.currentTarget.classList.remove('selector-btn-hover')}
      onMouseDown={(e) => e.currentTarget.classList.add('selector-btn-click')}
      onMouseUp={(e) => e.currentTarget.classList.remove('selector-btn-click')}
    >
      {label}
    </button>
  ))
}

export default function BtnSelector({ viewModeOptions, viewMode, onViewModeChange, dataSourceOptions, dataSource, onDataSourceChange }) {
  return (
    <div className="overlay-content">
      <div className="selector-controls-wrapper">
        <div className="selector-controls">
          {renderButtons(viewModeOptions, viewMode, onViewModeChange)}
        </div>
      </div>
      <div className="selector-controls-wrapper-data">
        <div className="selector-controls">
          {renderButtons(dataSourceOptions, dataSource, onDataSourceChange)}
        </div>
      </div>
    </div>
  )
}
