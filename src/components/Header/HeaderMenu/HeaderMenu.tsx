import { IUser } from '@/data/models';
import { AuthUser } from '@/types';
import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { AuthorizedMenu } from '../AuthorizedMenu/AuthorizedMenu';
import { EMenu } from '../Header';
import { UnAuthorizedMenu } from '../UnAuthorizedMenu/UnAuthorizedMenu';

export const HeaderMenu = () => {
  const queryClient = useQueryClient();
  const authUser: AuthUser | undefined = queryClient.getQueryData(['authUser']);
  const authUserName: IUser | undefined = queryClient.getQueryData([
    'users',
    'detail',
    authUser?.id,
  ]);
  console.log(authUserName);

  return (
    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
      {!!authUser ? (
        <AuthorizedMenu direction={EMenu.row} name={authUserName?.name} />
      ) : (
        <UnAuthorizedMenu />
      )}
    </Box>
  );
};
