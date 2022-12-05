import './TestFiles.scss';

import { useRef, useState } from 'react';
import Button from '@mui/material/Button';

import { FilesService } from '@/services/api/FilesService';
import { Spinner } from '@/components/shared/Spinner';

const existUserId = '638498d52a31e4ffb30e5173';
const existBoardId = '638498ed2a31e4ffb30e5177';
const existTaskId = '6384990c2a31e4ffb30e517e';
const existFileId = '638ca45f2a31e4ffb30e548f';

export const TestFiles = () => {
  const [fileId, setFileId] = useState(existFileId);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onGetAllFilesByBoardId = async (boardId: string) => {
    const allFilesInBoard = await FilesService.getFilesByBoardId(boardId);
    console.log('allFilesInBoard: ', allFilesInBoard);
  };

  const onUploadFile = async (boardId: string, taskId: string, file: Blob, fileName: string) => {
    const uploadedFile = await FilesService.uploadFile(boardId, taskId, file, fileName);
    setFileId(uploadedFile._id);
    console.log('uploadedFile: ', uploadedFile);
  };

  const onDeleteById = async (fileId: string) => {
    const deletedFile = await FilesService.deleteFileById(fileId);
    console.log('deletedFile: ', deletedFile);
  };

  const onGetByList = async (userId: string) => {
    const ids = undefined;
    // const ids = [fileId1, fileId2];
    const getByList = await FilesService.getFilesByListOfIdsOrUserIdOrTaskId(ids, userId);
    console.log('filesListByIdsOrUser: ', getByList);
  };

  const handleChangeImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<{
    name: string;
    file: Blob;
  }> => {
    setIsLoading(true);
    const files = event.target.files as FileList;
    const imageFile = files[0] as Blob;
    setIsLoading(false);
    const fileName = (imageFile as File)?.name;
    return {
      name: fileName,
      file: imageFile,
    };
  };

  return (
    <>
      <div>Results in console</div>
      <Button variant="contained" onClick={() => onGetAllFilesByBoardId(existBoardId)}>
        Get all board files
      </Button>
      <input
        type="file"
        onChange={async (e) => {
          const fileInfo = await handleChangeImage(e);
          await onUploadFile(existBoardId, existTaskId, fileInfo.file, fileInfo.name);
        }}
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInput}
      />
      <div className="btn-add-file" onClick={() => fileInput.current?.click()}>
        Upload file
      </div>
      <div className="spinner" style={{ position: 'absolute' }}>
        <Spinner isLoading={isLoading} />
      </div>
      <Button variant="contained" onClick={() => onDeleteById(fileId)}>
        Delete file
      </Button>
      <Button variant="contained" onClick={() => onGetByList(existUserId)}>
        Get files by list, user and search
      </Button>
    </>
  );
};
