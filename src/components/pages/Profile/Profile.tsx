import './Profile.scss';

import { FC, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Box, Modal } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { stringAvatar } from '@/utils/avatar';
import { ModalConfirm } from '@/components/shared/ModalConfirm';
import { ProfileEditForm } from '@/components/pages/Profile/ProfileEditForm';

import { useModal, useUserDelete } from '@/hooks';

import { User } from '@/data/models';
import { modalFormsStyle } from '@/components/shared/Modal';

export const Profile: FC = () => {
  const { t } = useTranslation();
  const user = useOutletContext<User>();

  const { isModalOpen, close, open } = useModal();
  const [isEditMode, setIsEditMode] = useState(false);
  const handleOpen = () => setIsEditMode(true);
  const handleClose = () => setIsEditMode(false);

  const modalType = 'Do you want to delete the user?';
  const userDelete = useUserDelete();
  const deleteUser = () => {
    userDelete.mutate(user._id);
  };
  const onDelete = (value: string) => {
    if (value === 'yes') {
      deleteUser();
    }
    close();
    return value;
  };

  return (
    <>
      <h2 className="page-name">{t('profile.title')}</h2>
      {user ? (
        <div className="profile">
          <div className="profile-authUser">
            <div className="profile-authUser__avatar">
              <Avatar
                {...stringAvatar(user.name, { width: '240px', height: '240px', fontSize: '4rem' })}
              />
            </div>
            <div className="profile-name">
              <div className="profile-name__title">Name:</div>
              <div className="profile-name__value">{user.name}</div>
            </div>
            <div className="profile-login">
              <div className="profile-login__title">Login:</div>
              <div className="profile-login__value">{user.login}</div>
            </div>

            <div className="profile-actions">
              <div className="profile-actions__edit" onClick={handleOpen}>
                {t('profile.edit')}
                <EditIcon aria-label="edit info" style={{ fontSize: '2rem' }} />
              </div>
              <div className="profile-actions__delete" onClick={open}>
                {t('profile.delete')}
                <DeleteIcon aria-label="delete" style={{ fontSize: '2rem' }} />
              </div>
            </div>
          </div>
          <Modal
            open={isEditMode}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ ...modalFormsStyle }}>
              <ProfileEditForm user={user} handleClose={handleClose} />
            </Box>
          </Modal>
        </div>
      ) : (
        <></>
      )}
      <div>
        {isModalOpen && (
          <ModalConfirm
            isModalOpen={isModalOpen}
            text={modalType}
            handleClick={(value) => onDelete(value)}
          />
        )}
      </div>
    </>
  );
};
