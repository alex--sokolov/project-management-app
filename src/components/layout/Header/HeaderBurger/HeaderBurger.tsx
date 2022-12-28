import * as React from 'react';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AuthorizedMenu, UnAuthorizedMenu } from '@/components/layout/Header';
import { Spinner } from '@/components/shared/Spinner';

import { EMenu } from '@/types';
import { User } from '@/data/models';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8acdea',
    },
  },
});

export function HeaderBurger({
  authUser,
  isLoading,
}: {
  authUser: User | null | undefined;
  isLoading: boolean;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openIt = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: { xs: 'block', sm: 'block', lg: 'none' } }}>
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
        sx={{ display: { xs: 'block', sm: 'block', lg: 'none' } }}
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        disableScrollLock={true}
        anchorEl={anchorEl}
        open={openIt}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {isLoading ? (
          <div style={{ minHeight: '160px', minWidth: '160px' }}>
            <Spinner isLoading={true} />
          </div>
        ) : !!authUser ? (
          <AuthorizedMenu direction={EMenu.column} name={authUser?.name} />
        ) : (
          <UnAuthorizedMenu />
        )}
      </Menu>
    </Box>
  );
}
