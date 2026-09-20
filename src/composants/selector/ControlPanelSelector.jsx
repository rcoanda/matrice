import { useContext } from 'react'
import { SelectionContext } from '../../providers/SelectionContext'
import { useTenant } from '../../hooks/tenant/useTenant'
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

export default function ControlPanelSelector() {
  const {
    motionKey, selectMotionKey,
    viewKey, selectViewKey,
    dataKey, setDataKey,
  } = useContext(SelectionContext)
  const { motionItems = [], viewItems = [], dataItems = [] } = useTenant()

  return (
    <div className="overlay-content">
      <div className="selector-groups">
        {motionItems.length > 0 && (
          <div className="selector-row">
            {renderButtons(motionItems, motionKey, selectMotionKey)}
          </div>
        )}
        {viewItems.length > 0 && (
          <div className="selector-row">
            {renderButtons(viewItems, viewKey, selectViewKey)}
          </div>
        )}
        {dataItems.length > 0 && (
          <div className="selector-row">
            {renderButtons(dataItems, dataKey, setDataKey)}
          </div>
        )}
      </div>
    </div>
  )
}