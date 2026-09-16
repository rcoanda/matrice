import { useContext } from 'react'
import { SelectionContext } from '../../providers/SelectionContext'
import ViewScene from '../canvas/view/common/ViewScene'
import '../../styles/BtnSelector.css'

export default function ViewSelector({ viewModeSelectorKey, dataSourceSelectorKey }) {
  const { dataSource, setDataSource, dataSourceOptions } = useContext(SelectionContext)

  // Le sélecteur affiche la liste des catégories (metaKey) : au clic, on retrouve
  // la source correspondante par son label et on sélectionne sa clé.
  const handleSelect = (art) => {
    const source = dataSourceOptions.find((s) => s.label === art?.collection)
    if (source) setDataSource(source.key)
  }

  // La scène des catégories occupe tout l'écran : on ne l'affiche que tant qu'aucune
  // source n'est choisie (accueil), pour ne pas masquer la galerie une fois sélectionnée.
  const showCategories = !dataSource && viewModeSelectorKey && dataSourceSelectorKey

  return (
    <div className="overlay-content">

      {showCategories && (
        <ViewScene
          viewModeKey={viewModeSelectorKey}
          dataSourceKey={dataSourceSelectorKey}
          onSelect={handleSelect}
        />
      )}

    </div>
  )
}