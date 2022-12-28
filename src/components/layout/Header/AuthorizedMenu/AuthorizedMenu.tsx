import { Link } from 'react-router-dom';
import { PropsType } from '@/types';
import Avatar from '@mui/material/Avatar';
import { useTranslation } from 'react-i18next';
import { stringAvatar } from '@/utils/avatar';

export const AuthorizedMenu = (props: PropsType) => {
  const { t } = useTranslation();
  const name = props.name as string;

  return (
    <nav className="header__nav">
      <ul className={props.direction}>
        <li className="header__list-item">
          <Link to="/" className="header__link">
            <button className="button">{t('header.welcome')}</button>
          </Link>
        </li>
        <li className="header__list-item">
          <Link to="/boards" className="header__link">
            <button className="button">{t('header.main-page')}</button>
          </Link>
        </li>
        <li className="header__list-item">
          <Link to="/profile" className="header__link">
            <button className="button">{t('header.profile')}</button>
          </Link>
        </li>
        <li className="header__list-item_name">
          <div>
            <Avatar
              {...stringAvatar(name, { width: '40px', height: '40px', fontSize: '1.25rem' })}
            />
          </div>
        </li>
        <li className="header__list-item">
          <Link to="/auth/signout" className="header__link">
            <button className="button">{t('header.sign-out')}</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
