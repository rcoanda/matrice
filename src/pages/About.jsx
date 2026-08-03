import BackArrow from '../composants/assets/BackArrow'
import { useDico } from '../composants/lang/Dico'

export default function About() {
  const { t } = useDico()
  return (
    <>
      <BackArrow />
      <div>{t('title', 'about')}</div>
    </>
  )
}
