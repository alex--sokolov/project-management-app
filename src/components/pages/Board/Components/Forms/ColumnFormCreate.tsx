import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Box, Modal } from '@mui/material';
import { ColumnForm } from '@/components/pages/Board/Components/Forms/ColumnForm';

import { Column } from '@/data/models';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  border: '2px solid dodgerblue',
  borderRadius: '10px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const ColumnFormCreate: FC<{
  createColumn: (newColumn: Omit<Column, '_id'>) => void;
  boardId: string | undefined;
  totalColumns: number;
}> = ({ createColumn, boardId, totalColumns }) => {
  const { t } = useTranslation();

  const [isFormOpened, setIsFormOpened] = useState(false);
  const handleOpen = () => setIsFormOpened(true);
  const handleClose = () => setIsFormOpened(false);

  return (
    <div className="user-board user-board_add-btn">
      <Fab color="secondary" aria-label="edit" onClick={handleOpen}>
        <AddIcon />
      </Fab>{' '}
      + {t('board.add-column')}
      <Modal
        open={isFormOpened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <ColumnForm
            boardId={boardId}
            createColumn={createColumn}
            handleClose={handleClose}
            totalColumns={totalColumns}
          />
        </Box>
      </Modal>
    </div>
  );
};
