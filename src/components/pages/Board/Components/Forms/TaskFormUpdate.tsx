import React, { FC, useState } from 'react';
import { Box, Modal } from '@mui/material';

import { Task } from '@/data/models';
import { TaskForm } from '@/components/pages/Board/Components/Forms/TaskForm';
import { modalFormsStyle } from '@/components/shared/Modal/modalFormsStyle';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

export const TaskFormUpdate: FC<{
  updateTask?: (
    taskId: string,
    boardId: string,
    columnId: string,
    userId: string,
    newTask: Pick<Task, 'title' | 'description' | 'order'>
  ) => Promise<void>;
  taskId: string;
  boardId: string | undefined;
  columnId: string | undefined;
  userId: string | undefined;
  order: number;
  title: string;
  description: string;
}> = ({ updateTask, taskId, boardId, columnId, userId, order, title, description }) => {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const handleOpen = () => setIsFormOpened(true);
  const handleClose = () => setIsFormOpened(false);

  return (
    <>
      <Modal
        open={isFormOpened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalFormsStyle }}>
          <TaskForm
            defaultValues={{
              title: title,
              description: description,
              order: order,
            }}
            taskId={taskId}
            boardId={boardId}
            columnId={columnId}
            userId={userId}
            updateTask={updateTask}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
      <Button
        variant="contained"
        onClick={handleOpen}
        style={{
          minWidth: '22px',
          padding: '0',
          height: '22px',
          margin: '10px 0 0 5px',
        }}
      >
        <EditIcon aria-label="edit column title" style={{ fontSize: '14px' }} />
      </Button>
    </>
  );
};
