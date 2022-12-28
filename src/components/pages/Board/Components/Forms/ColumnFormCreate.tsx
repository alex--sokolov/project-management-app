import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Box, Modal } from '@mui/material';
import { ColumnForm } from '@/components/pages/Board/Components/Forms/ColumnForm';

import { Column } from '@/data/models';
import { modalFormsStyle } from '@/components/shared/Modal';

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
        <Box sx={{ ...modalFormsStyle }}>
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
