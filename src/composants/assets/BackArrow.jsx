import { useNavigate } from 'react-router-dom'
import { useDico } from '../lang/Dico'

export default function BackArrow({ onClick }) {
  const navigate = useNavigate()
  const { t } = useDico()

  return (
    <button
      onClick={() => {
        onClick?.()
        navigate('/')
      }}
      style={{
        position: 'fixed',
        top: '5rem',
        left: '2rem',
        zIndex: 60,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--color-gallery)',
      }}
      aria-label={t('ariaLabel', 'backArrow')}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
    </button>
  )
}
