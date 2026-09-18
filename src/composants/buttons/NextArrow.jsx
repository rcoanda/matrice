import { useContext } from 'react'
import { SelectionContext } from '../../providers/SelectionContext'
import { useDico } from '../../providers/LanguageContext'
//next datasource
export default function NextArrow() {
  const { data, setData, dataOptions } = useContext(SelectionContext)
  const { t } = useDico()

  const handleNext = () => {
    if (!dataOptions.length) return
    const index = dataOptions.findIndex((item) => item.key === data)
    const next = dataOptions[(index + 1) % dataOptions.length]
    setData(next.key)
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