import { useContext } from 'react'
import { SelectionContext } from '../../providers/SelectionContext'
import '../../styles/BtnSelector.css'
//double selector: view et data
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

export default function BtnSelector() {
  const {
    motionOptions, motion, selectMotion,
    viewItems, viewKey, selectViewKey,
    dataOptions, data, setData,
  } = useContext(SelectionContext)

  return (
    <div className="overlay-content">
      <div className="selector-groups">
        {motionOptions.length > 0 && (
          <div className="selector-row">
            {renderButtons(motionOptions, motion, selectMotion)}
          </div>
        )}
        {viewItems.length > 0 && (
          <div className="selector-row">
            {renderButtons(viewItems, viewKey, selectViewKey)}
          </div>
        )}
        {dataOptions.length > 0 && (
          <div className="selector-row">
            {renderButtons(dataOptions, data, setData)}
          </div>
        )}
      </div>
    </div>
  )
}