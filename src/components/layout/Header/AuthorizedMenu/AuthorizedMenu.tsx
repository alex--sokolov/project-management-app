import { Link } from 'react-router-dom';
import { PropsType } from '@/types';

export const AuthorizedMenu = (props: PropsType) => {
  return (
    <nav className="header__nav">
      <ul className={props.direction}>
        <li className="header__list-item">
          <Link to="/" className="header__link">
            <button className="button">main page</button>
          </Link>
        </li>
        <li className="header__list-item">
          <Link to="/boards" className="header__link">
            <button className="button">boards</button>
          </Link>
        </li>
        <li className="header__list-item">
          <Link to="/profile" className="header__link">
            <button className="button">profile</button>
          </Link>
        </li>
        <li>
          <div>{props.name}</div>
        </li>
        <li className="header__list-item">
          <Link to="/auth/signout" className="header__link">
            <button className="button">sign out</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
