import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { AuthorizedMenu } from '../AuthorizedMenu/AuthorizedMenu';
import { EMenu } from '../Header';
import { UnAuthorizedMenu } from '../UnAuthorizedMenu/UnAuthorizedMenu';

export const HeaderMenu = () => {
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(['authUser']);
  return (
    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
      {!!authUser ? <AuthorizedMenu direction={EMenu.row} /> : <UnAuthorizedMenu />}
    </Box>
  );
};
