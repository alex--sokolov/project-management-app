import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <ul className="footer__authors">
          <li>
            <a className="footer__link" href="https://github.com/alex--sokolov">
              <img className="footer__link-img alex" src="github.svg" alt="github" />
              <p>Alexander</p>
            </a>
          </li>
          <li>
            <a className="footer__link" href="https://github.com/AlionaMu">
              <img className="footer__link-img andrei" src="github.svg" alt="github" />

              <p>Aliona</p>
            </a>
          </li>
          <li>
            <a className="footer__link" href="https://github.com/atmoranso">
              <img className="footer__link-img andrei" src="github.svg" alt="github" />
              <p>Andrei</p>
            </a>
          </li>
        </ul>
        <p className="footer__year">2022</p>
        <div className="footer__rs">
          <a href="https://rs.school/react/">
            <img className="footer__link-img" src="rs-school-js.svg" alt="RSSchool" />
          </a>
        </div>
      </div>
    </footer>
  );
}
