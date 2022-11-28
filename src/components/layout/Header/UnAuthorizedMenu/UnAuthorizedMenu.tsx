import { Link } from 'react-router-dom';

export const UnAuthorizedMenu = () => {
  return (
    <nav className="header__nav">
      <ul className="header__list">
        <li className="header__list-item">
          <Link to="/auth/signup" className="header__link">
            <button className="button">Sign Up</button>
          </Link>
        </li>
        <li className="header__list-item">
          <Link to="/auth/signin" className="header__link">
            <button className="button">Sign In</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
