import { useContext } from 'react'
import { SelectionContext } from '../../providers/SelectionContext'
import ViewScene from '../canvas/view/common/ViewScene'
import '../../styles/BtnSelector.css'

export default function ViewSelector({ viewModeSelectorKey, dataSourceSelectorKey }) {
  const { setDataSource, dataSourceOptions } = useContext(SelectionContext)

  // Le sélecteur affiche la liste des catégories (metaKey) : au clic, on retrouve
  // la source correspondante par son label et on sélectionne sa clé.
  const handleSelect = (art) => {
    const source = dataSourceOptions.find((s) => s.label === art?.collection)
    if (source) setDataSource(source.key)
  }

  return (
    <div className="overlay-content">

      {viewModeSelectorKey && dataSourceSelectorKey && (
        <ViewScene
          viewModeKey={viewModeSelectorKey}
          dataSourceKey={dataSourceSelectorKey}
          onSelect={handleSelect}
        />
      )}

    </div>
  )
}