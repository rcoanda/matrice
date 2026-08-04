import BackArrow from '../composants/assets/BackArrow'
import { useDico } from '../composants/lang/Dico'
import '../styles/shared.css'
import '../styles/Contact.css'

export default function Contact() {
  const { t } = useDico()
  return (
    <>
      <BackArrow />
      <div className="contact-layout">
        <h1 className="contact-title">{t('title', 'contact')}</h1>
        <dl className="contact-info">
          <div className="contact-row">
            <dt>{t('emailLabel', 'contact')}</dt>
            <dd>{t('email', 'contact')}</dd>
          </div>
          <div className="contact-row">
            <dt>{t('phoneLabel', 'contact')}</dt>
            <dd>{t('phone', 'contact')}</dd>
          </div>
          <div className="contact-row">
            <dt>{t('addressLabel', 'contact')}</dt>
            <dd>{t('address', 'contact')}</dd>
          </div>
          <div className="contact-row">
            <dt>{t('hoursLabel', 'contact')}</dt>
            <dd>{t('hours', 'contact')}</dd>
          </div>
        </dl>
      </div>
    </>
  )
}
