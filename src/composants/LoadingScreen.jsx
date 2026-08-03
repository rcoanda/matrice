import '../styles/shared.css'
import '../styles/LoadingScreen.css'
import { useDico } from './lang/Dico'

export default function LoadingScreen({ progress }) {
  const { t } = useDico()
  return (
    <div className="loading-screen">
      <div className="text-center">
        <div className="loading-bar-track">
          <div
            className="loading-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="loading-text">
          {t('loadingMessage', 'loadingScreen')}
        </p>
      </div>
    </div>
  )
}
