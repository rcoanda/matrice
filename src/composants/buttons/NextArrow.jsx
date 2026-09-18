import { useContext } from 'react'
import { SelectionContext } from '../../providers/SelectionContext'
import { useDico } from '../../providers/LanguageContext'
//next datasource
export default function NextArrow() {
  const { dataKey, setDataKey, dataItems } = useContext(SelectionContext)
  const { t } = useDico()

  const handleNext = () => {
    if (!dataItems.length) return
    const index = dataItems.findIndex((item) => item.key === dataKey)
    const next = dataItems[(index + 1) % dataItems.length]
    setDataKey(next.key)
  }

  return (
    <button
      onClick={handleNext}
      className="icon-btn"
      style={{
        position: 'fixed',
        top: '5rem',
        right: '2rem',
        zIndex: 60,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--color-gallery)',
      }}
      aria-label={t('ariaLabel', 'nextArrow')}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
      </svg>
    </button>
  )
}