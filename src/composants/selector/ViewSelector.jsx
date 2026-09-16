import { useContext, useMemo } from 'react'
import { SelectionContext } from '../../providers/SelectionContext'
import { loadMetaData } from '../../services/metaDataLoader'
import { imgSource, videoSource, glbSource } from '../../utils/mediaPaths'
import ViewScene from '../canvas/view/common/ViewScene'
import '../../styles/BtnSelector.css'



export default function ViewSelector({ viewModeSelectorKey }) {

  const { dataSourceOptions, dataSource, setDataSource } = useContext(SelectionContext)

  //metaDataSourceItem fictif , construit à partir de dataSourceOptions et inséré dans dataConfigItems
  // { key: 'metaKey', label: 'Categories', file: null, loader: loadMetaData }, 
  const metaDataSourceKey = null




  return (
    <>
      <div className="overlay-content">
        <div className="selector-groups">
          {viewModeSelectorKey && metaDataSourceKey && (
            <ViewScene viewModeKey={viewModeSelectorKey} dataSourceItem={metaDataSourceKey} onSelect={setDataSource} />
          )}
        </div>
      </div>
    </>
  )
}