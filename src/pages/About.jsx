import CloseButton from '../composants/buttons/CloseButton'
import { useDico } from '../providers/DicoProvider'
import '../styles/shared.css'
import '../styles/About.css'

export default function About() {
  const { t } = useDico()
  return (
    <>
      <CloseButton />
      <div className="about-layout">
        <h1 className="about-title">{t('title', 'about')}</h1>
        <p className="about-description">{t('description', 'about')}</p>
      </div>
    </>
  )
}
