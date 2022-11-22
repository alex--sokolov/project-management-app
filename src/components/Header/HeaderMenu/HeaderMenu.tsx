import { PropsType } from '@/data/models';
import { Box } from '@mui/material';
import { AuthorizedMenu } from '../AuthorizedMenu/AuthorizedMenu';
import { EMenu } from '../Header';

export const HeaderMenu = ({ open }: PropsType) => {
  return (
    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
      <AuthorizedMenu open={open} direction={EMenu.row}></AuthorizedMenu>
    </Box>
  );
};
