import * as React from 'react';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AuthorizedMenu, UnAuthorizedMenu } from '@/components/Header';

import { AuthUserToken, EMenu } from '@/types';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8acdea',
    },
  },
});

export function HeaderBurger({ authUser }: { authUser: AuthUserToken | null | undefined }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openIt = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
      <ThemeProvider theme={theme}>
        <IconButton
          size="large"
          edge="start"
          color="primary"
          aria-label="menu"
          sx={{ mr: 2 }}
          id="fade-button"
          aria-controls={openIt ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openIt ? 'true' : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
      </ThemeProvider>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={openIt}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {!!authUser ? (
          <AuthorizedMenu direction={EMenu.column} name={authUser?.name} />
        ) : (
          <UnAuthorizedMenu />
        )}
      </Menu>
    </Box>
  );
}
