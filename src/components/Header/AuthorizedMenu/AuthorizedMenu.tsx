import { PropsType } from '@/data/models';
import { Link } from 'react-router-dom';

export const AuthorizedMenu = (props: PropsType) => {
  return (
    <nav className="header__nav">
      <ul className={props.direction}>
        <li className="header__list-item">
          <button className="button">
            <Link to="/" className="header__link">
              main page
            </Link>
          </button>
        </li>
        <li className="header__list-item">
          <button className="button">
            <Link to="/boards" className="header__link">
              boards
            </Link>
          </button>
        </li>
        <li className="header__list-item">
          <button className="button">
            <Link to="/profile" className="header__link">
              profile
            </Link>
          </button>
        </li>
        <li>
          <div>name</div>
        </li>
        <li className="header__list-item">
          <button className="button" onClick={props.open}>
            <Link to="/" className="header__link">
              sign out
            </Link>
          </button>
        </li>
      </ul>
    </nav>
  );
};
