import { Box } from '@mui/material';

import { AuthorizedMenu, UnAuthorizedMenu } from '@/components/layout/Header';
import { Spinner } from '@/components/shared/Spinner';

import { EMenu } from '@/types';
import { User } from '@/data/models';

export const HeaderMenu = ({
  authUser,
  isLoading,
}: {
  authUser: User | null | undefined;
  isLoading: boolean;
}) => {
  return (
    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : !!authUser ? (
        <AuthorizedMenu direction={EMenu.row} name={authUser?.name} />
      ) : (
        <UnAuthorizedMenu />
      )}
    </Box>
  );
};
