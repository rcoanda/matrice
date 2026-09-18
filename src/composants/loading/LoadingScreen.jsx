import '../../styles/shared.css'
import '../../styles/LoadingScreen.css'
import { useDico } from '../../providers/LanguageContext'

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
          <span className="loading-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </p>
      </div>
    </div>
  )
}
