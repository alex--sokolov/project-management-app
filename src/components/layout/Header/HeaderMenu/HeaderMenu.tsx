import { Box } from '@mui/material';

import { AuthorizedMenu, UnAuthorizedMenu } from '@/components/layout/Header';

import { AuthUserToken, EMenu } from '@/types';

export const HeaderMenu = ({ authUser }: { authUser: AuthUserToken | null | undefined }) => {
  return (
    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
      {!!authUser ? (
        <AuthorizedMenu direction={EMenu.row} name={authUser?.name} />
      ) : (
        <UnAuthorizedMenu />
      )}
    </Box>
  );
};
