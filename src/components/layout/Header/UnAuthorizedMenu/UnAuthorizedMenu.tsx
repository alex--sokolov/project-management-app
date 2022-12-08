import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const UnAuthorizedMenu = () => {
  const { t } = useTranslation();

  return (
    <nav className="header__nav">
      <ul className="header__list">
        <li className="header__list-item">
          <Link to="/auth/signup" className="header__link">
            <button className="button">{t('header.signup')}</button>
          </Link>
        </li>
        <li className="header__list-item">
          <Link to="/auth/signin" className="header__link">
            <button className="button">{t('header.sign-in')}</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
