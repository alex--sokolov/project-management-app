import { motion, useMotionTemplate, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import './Header.scss';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PropsType } from '@/data/models';
import HeaderBurger from './HeaderBurger/HeaderBurger';
import { HeaderMenu } from './HeaderMenu/HeaderMenu';

export enum EMenu {
  row = 'header__list',
  column = 'header__burger-list',
}

const scrollThreshold = [0, 50];

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Header({ open }: PropsType) {
  const { scrollY } = useScroll();
  const scrollYOnDirectionChange = useRef(scrollY.get());
  const lastPixelsScrolled = useRef<number>(0);
  const lastScrollDirection = useRef<string>();
  const pixelsScrolled = useMotionValue(0);
  const height = useTransform(pixelsScrolled, scrollThreshold, [130, 70]);
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
  }, [height, pixelsScrolled, scrollY]);

  return (
    <>
      <motion.header
        style={{
          height,
          backgroundColor: backgroundColorTemplate,
          position: 'fixed',
          width: '100%',
        }}
        className="header"
      >
        <div className="header__wrapper">
          <h1 className="header__logo">Project Management System</h1>
          <FormGroup>
            <Stack direction="row" alignItems="center">
              <Typography>RU</Typography>
              <Switch {...label} defaultChecked />
              <Typography>EN</Typography>
            </Stack>
          </FormGroup>
          <HeaderMenu open={open}></HeaderMenu>
          <HeaderBurger open={open}></HeaderBurger>
        </div>
      </motion.header>
    </>
  );
}
