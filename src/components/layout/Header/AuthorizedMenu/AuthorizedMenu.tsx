import { Link } from 'react-router-dom';
import { PropsType } from '@/types';
import Avatar from '@mui/material/Avatar';
import { useTranslation } from 'react-i18next';

export const AuthorizedMenu = (props: PropsType) => {
  const { t } = useTranslation();

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name[0]}${name[1]}`.toUpperCase(),
    };
  }
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
            <Avatar {...stringAvatar('potter')} />
            {/* Hello
            <br />
            {props.name}! */}
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
