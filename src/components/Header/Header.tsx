import { motion, useMotionTemplate, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import './Header.scss';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const scrollThreshold = [0, 50];

const label = { inputProps: { 'aria-label': 'Switch demo' } };

type PropsType = {
  open: () => void;
};

export default function Header({ open }: PropsType) {
  const { scrollY } = useScroll();
  const scrollYOnDirectionChange = useRef(scrollY.get());
  const lastPixelsScrolled = useRef<number>(0);
  const lastScrollDirection = useRef<string>();
  const pixelsScrolled = useMotionValue(0);
  const height = useTransform(pixelsScrolled, scrollThreshold, [120, 70]);
  const logoHeight = useTransform(pixelsScrolled, scrollThreshold, [34, 30]);
  const backgroundOpacity = useTransform(pixelsScrolled, scrollThreshold, [1, 0.4]);
  const backgroundColorTemplate = useMotionTemplate`rgba(116 109 117 / ${backgroundOpacity})`;

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest < 0) return;

      const isScrollingDown = scrollY.getPrevious() - latest < 0;
      const scrollDirection = isScrollingDown ? 'down' : 'up';
      const currentPixelsScrolled = pixelsScrolled.get();
      let newPixelsScrolled;

      if (lastScrollDirection.current !== scrollDirection) {
        lastPixelsScrolled.current = currentPixelsScrolled;
        scrollYOnDirectionChange.current = latest;
      }
      if (isScrollingDown) {
        newPixelsScrolled = Math.min(
          lastPixelsScrolled.current + (latest - scrollYOnDirectionChange.current),
          scrollThreshold[1]
        );
      } else {
        newPixelsScrolled = Math.max(
          lastPixelsScrolled.current - (scrollYOnDirectionChange.current - latest),
          scrollThreshold[0]
        );
      }
      pixelsScrolled.set(newPixelsScrolled);
      lastScrollDirection.current = scrollDirection;
    });
  }, [height, logoHeight, pixelsScrolled, scrollY]);

  return (
    <>
      <motion.header
        style={{
          height,
          backgroundColor: backgroundColorTemplate,
          position: 'fixed',
          width: '100%',
        }}
        className="fixed header"
      >
        <div className="header__wrapper">
          <h1 className="header__logo">Project Management System</h1>
          <nav className="header__nav">
            <ul className="header__list">
              <li className="header__list-item">
                <button className="button">
                  <Link to="/profile" className="header__link">
                    edit profile
                  </Link>
                </button>
              </li>
              <li className="header__list-item">
                <button className="button">
                  <Link to="/" className="header__link">
                    sign out
                  </Link>
                </button>
              </li>
              <li className="header__list-item">
                <button className="button" onClick={open}>
                  create new board
                </button>
              </li>
            </ul>
          </nav>
          <FormGroup>
            <Stack direction="row" alignItems="center">
              <Typography>RU</Typography>
              <Switch {...label} defaultChecked />
              <Typography>EN</Typography>
            </Stack>
          </FormGroup>
        </div>
      </motion.header>
    </>
  );
}
