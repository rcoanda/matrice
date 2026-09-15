import { useContext } from 'react'
import { getInitList } from '../../config/config'
import { SelectionContext } from '../../providers/SelectionProvider'
import { useDico } from '../../providers/DicoProvider'

export default function NextArrow() {
  const { dataSource, setDataSource } = useContext(SelectionContext)
  const { t } = useDico()

  const handleNext = async () => {
    const list = await getInitList('dataConfig')
    if (!list.length) return
    const index = list.findIndex((item) => item.key === dataSource)
    const next = list[(index + 1) % list.length]
    setDataSource(next.key)
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