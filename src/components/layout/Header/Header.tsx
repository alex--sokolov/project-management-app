import './Header.scss';

import { ChangeEvent, useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useTransform, useScroll } from 'framer-motion';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';
import { AuthUserState } from '@/types';
import { HeaderMenu, HeaderBurger } from '@/components/layout/Header';
import { Link } from 'react-router-dom';
import i18n, { lang } from '@/i18n';
import { useTranslation } from 'react-i18next';
import { LocalStorageService } from '@/services/localStorage';
import { alpha, styled } from '@mui/material/styles';

const scrollThreshold = [0, 50];

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const GreenSwitch = styled(Switch)(({ theme }) => {
  const color = '#0ed1d1';
  return {
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: color,
      '&:hover': {
        backgroundColor: alpha(color, theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: color,
    },
  };
});

export function Header(props: { userInfo: AuthUserState }) {
  const { t } = useTranslation();

  const { authUser, isLoading } = props.userInfo;
  const { scrollY } = useScroll();
  const scrollYOnDirectionChange = useRef(scrollY.get());
  const lastPixelsScrolled = useRef<number>(0);
  const lastScrollDirection = useRef<string>();
  const pixelsScrolled = useMotionValue(0);
  const height = useTransform(pixelsScrolled, scrollThreshold, [130, 70]);
  const backgroundOpacity = useTransform(pixelsScrolled, scrollThreshold, [1, 0.9]);
  const scale = useTransform(pixelsScrolled, scrollThreshold, [1, 0.7]);
  const backgroundColorTemplate = useMotionTemplate`rgba(24 87 94 / ${backgroundOpacity})`;
  const logoScale = useMotionTemplate`scale(${scale})`;

  const changeLanguage = async (language: string) => {
    await i18n.changeLanguage(language);
    LocalStorageService.setLang(language);
  };

  const handleChangeLanguage = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? changeLanguage('en') : changeLanguage('ru');
  };

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
          <Link to="/" className="header__logo-link">
            <motion.h1
              className="header__logo"
              style={{
                transform: logoScale,
              }}
            >
              {t('welcome.title')}
            </motion.h1>
          </Link>
          <FormGroup onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeLanguage(e)}>
            <Stack direction="row" alignItems="center">
              <Typography>{t('language.ru')}</Typography>
              <GreenSwitch {...label} defaultChecked={lang === 'en'} />
              <Typography>{t('language.en')}</Typography>
            </Stack>
          </FormGroup>
          <HeaderMenu authUser={authUser} isLoading={isLoading} />
          <HeaderBurger authUser={authUser} isLoading={isLoading} />
        </div>
      </motion.header>
    </>
  );
}
