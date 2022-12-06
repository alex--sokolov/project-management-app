import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <ul className="footer__authors">
          <li>
            <a className="footer__link" href="https://github.com/alex--sokolov">
              <div className="footer__link-img" />
              <p>Alexander</p>
            </a>
          </li>
          <li>
            <a className="footer__link" href="https://github.com/AlionaMu">
              <div className="footer__link-img" />

              <p>Aliona</p>
            </a>
          </li>
          <li>
            <a className="footer__link" href="https://github.com/atmoranso">
              <div className="footer__link-img" />
              <p>Andrei</p>
            </a>
          </li>
        </ul>
        <p className="footer__year">2022</p>
        <div className="footer__rs">
          <a href="https://rs.school/react/">
            <div className="footer__link-rsschool" />
          </a>
        </div>
      </div>
    </footer>
  );
}
