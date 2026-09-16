import { useContext, useMemo } from 'react'
import { SelectionContext } from '../../providers/SelectionContext'
import { loadMetaData } from '../../services/metaDataLoader'
import { imgSource, videoSource, glbSource } from '../../utils/mediaPaths'
import ViewScene from '../canvas/view/common/ViewScene'
import '../../styles/BtnSelector.css'

function sourcePath(item) {
  if (item.type === 'video') return videoSource(item.file)
  if (item.type === 'glb') return glbSource(item.file)
  return imgSource(item.file)
}

export default function ViewSelector({ viewMode }) {
  const { dataSourceOptions, dataSource, setDataSource } = useContext(SelectionContext)

  const selected = dataSourceOptions.find((o) => o.key === dataSource) ?? dataSourceOptions[0]
  const activeKey = dataSource || selected?.key

  const dataSourceItem = useMemo(() => {
    if (!selected) return null
    return {
      key: `${selected.key}-meta`,
      label: selected.label,
      file: selected.file,
      type: selected.type,
      loader: () => loadMetaData(sourcePath(selected), selected.type, selected.label),
    }
  }, [selected])

  return (
    <>
      <div className="overlay-content">
        <div className="selector-groups">
          {dataSourceOptions.length > 0 && (
            <div className="selector-row">
              {dataSourceOptions.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDataSource(key)}
                  className={`selector-btn ${activeKey === key ? 'selector-btn-active' : 'selector-btn-inactive'}`}
                  onMouseEnter={(e) => e.currentTarget.classList.add('selector-btn-hover')}
                  onMouseLeave={(e) => e.currentTarget.classList.remove('selector-btn-hover')}
                  onMouseDown={(e) => e.currentTarget.classList.add('selector-btn-click')}
                  onMouseUp={(e) => e.currentTarget.classList.remove('selector-btn-click')}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {viewMode && dataSourceItem && (
        <ViewScene viewModeKey={viewMode} dataSourceItem={dataSourceItem} />
      )}
    </>
  )
}