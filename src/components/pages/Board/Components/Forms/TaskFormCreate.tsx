import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Box, Modal } from '@mui/material';

import { Task } from '@/data/models';
import { TaskForm } from '@/components/pages/Board/Components/Forms/TaskForm';
import { modalFormsStyle } from '@/components/shared/Modal/modalFormsStyle';

export const TaskFormCreate: FC<{
  createTask: (
    boardId: string,
    columnId: string,
    userId: string,
    newTask: Pick<Task, 'title' | 'description' | 'order'>
  ) => void;
  boardId: string | undefined;
  columnId: string | undefined;
  userId: string | undefined;
  totalTasksInColumn: number;
}> = ({ createTask, boardId, columnId, userId, totalTasksInColumn }) => {
  const { t } = useTranslation();
  const [isFormOpened, setIsFormOpened] = useState(false);
  const handleOpen = () => setIsFormOpened(true);
  const handleClose = () => setIsFormOpened(false);

  return (
    <div className="add-task add-task-btn">
      <Fab color="secondary" aria-label="edit" onClick={handleOpen}>
        <AddIcon />
      </Fab>{' '}
      + {t('board.add-task')}
      <Modal
        open={isFormOpened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalFormsStyle }}>
          <TaskForm
            boardId={boardId}
            columnId={columnId}
            userId={userId}
            createTask={createTask}
            handleClose={handleClose}
            defaultValues={{
              title: '',
              description: '',
              order: totalTasksInColumn + 1,
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};
