import { useNavigate } from 'react-router-dom'
import { useDico } from '../lang/Dico'

export default function CloseButton({ onClick, className }) {
  const navigate = useNavigate()
  const { t } = useDico()

  return (
    <button
      onClick={() => {
        if (onClick) onClick()
        else navigate('/')
      }}
      className={className}
      style={className ? undefined : {
        position: 'fixed',
        top: '5rem',
        right: '2rem',
        zIndex: 60,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--color-gallery)',
      }}
      aria-label={t('ariaLabel', 'closeButton')}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  )
}
