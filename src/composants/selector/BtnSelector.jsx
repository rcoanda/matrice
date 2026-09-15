import { useEffect, useState } from 'react'
import { getInitList } from '../../config/config'
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

export default function BtnSelector({
  motion, onMotionChange,
  viewMode, onViewModeChange,
  dataSource, onDataSourceChange }) {

  const [motionOptions, setMotionOptions] = useState([])
  const [viewModeOptions, setViewModeOptions] = useState([])
  const [dataSourceOptions, setDataSourceOptions] = useState([])

  useEffect(() => {
    getInitList('motionConfig').then(setMotionOptions)
    getInitList('viewConfig').then(setViewModeOptions)
    getInitList('dataConfig').then(setDataSourceOptions)
  }, [])

  return (
    <div className="overlay-content">
      <div className="selector-groups">
        {motionOptions.length > 0 && (
          <div className="selector-row">
            {renderButtons(motionOptions, motion, onMotionChange)}
          </div>
        )}
        {viewModeOptions.length > 0 && (
          <div className="selector-row">
            {renderButtons(viewModeOptions, viewMode, onViewModeChange)}
          </div>
        )}
        <div className="selector-row">
          {renderButtons(dataSourceOptions, dataSource, onDataSourceChange)}
        </div>
      </div>
    </div>
  )
}
