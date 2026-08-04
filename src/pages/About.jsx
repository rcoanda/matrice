import BackArrow from '../composants/assets/BackArrow'
import { useDico } from '../composants/lang/Dico'
import '../styles/shared.css'
import '../styles/About.css'

export default function About() {
  const { t } = useDico()
  return (
    <>
      <BackArrow />
      <div className="about-layout">
        <h1 className="about-title">{t('title', 'about')}</h1>
        <p className="about-description">{t('description', 'about')}</p>
      </div>
    </>
  )
}
