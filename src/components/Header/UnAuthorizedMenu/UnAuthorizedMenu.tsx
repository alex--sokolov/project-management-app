import { PropsType } from '@/data/models';
import { Link } from 'react-router-dom';

export const UnAuthorizedMenu = ({ open }: PropsType) => {
  return (
    <nav className="header__nav">
      <ul className="header__list">
        <li className="header__list-item">
          <button className="button" onClick={open}>
            <Link to="/" className="header__link">
              sign up
            </Link>
          </button>
        </li>
        <li className="header__list-item">
          <button className="button" onClick={open}>
            <Link to="/" className="header__link">
              sign in
            </Link>
          </button>
        </li>
      </ul>
    </nav>
  );
};
