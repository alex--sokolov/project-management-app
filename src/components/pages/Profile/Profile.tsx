import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ToastContainer } from 'react-toastify';
import { useAuthUser, useModal, useUserDelete, useUserUpdate } from '@/hooks';
import { UserUpdate } from '@/data/models';

import { LocalStorageService } from '@/services/localStorage';
import {
  makeValidationObj,
  defaultRegisterFields,
  emailErrMsg,
  emailPattern,
  onlyWordsErrMsg,
  onlyWordsPattern,
} from '@/services/validate';

import { AuthUserToken } from '@/types';
import jwt_decode from 'jwt-decode';
import './Profile.scss';

import { LOGIN_MIN_LENGTH, NAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from '@/configs/forms';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from '@/services/modals';
import { userDeleted, userEdited } from '@/services/toasts/toasts';

export const Profile: FC = () => {
  const navigate = useNavigate();
  const authUserObj = useAuthUser();
  const [showSubmitBtn, setShowSubmitButton] = useState(true);

  const { isModalOpen, close, open } = useModal();
  const modalType = 'Do you want to delete the user?';

  const userUpdate = useUserUpdate();
  const editUser = async (user: UserUpdate) => {
    return await userUpdate.mutateAsync(user);
  };

  const userDelete = useUserDelete();
  const deleteUser = async (/*id: string*/) => {
    const token = LocalStorageService.getToken();
    const user: AuthUserToken = jwt_decode(token as string);
    open();
    try {
      await userDelete.mutateAsync(user.id);
    } catch (error) {
      console.error(error);
    } finally {
      userDeleted();
      LocalStorageService.logOutUser();
      navigate('/');
      (async function () {
        await authUserObj.refetch();
      })();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdate>({
    defaultValues: defaultRegisterFields,
  });

  const onSubmit: SubmitHandler<UserUpdate> = async (data) => {
    const token = LocalStorageService.getToken();
    const userData: AuthUserToken = jwt_decode(token as string);
    setShowSubmitButton(false);
    data._id = userData.id;
    try {
      await editUser(data);
      userEdited();
    } catch (error) {
      setShowSubmitButton(true);
    }
  };

  const handleClick = (value: string) => {
    if (value === 'yes') {
      deleteUser();
    }
    close();
    return value;
  };

  return (
    <div className="profile">
      <form onSubmit={handleSubmit(onSubmit)} className="profile__form">
        <div className="profile__element">
          <input
            className="profile__input"
            type="text"
            {...register(
              'name',
              makeValidationObj(NAME_MIN_LENGTH, onlyWordsPattern, onlyWordsErrMsg)
            )}
            placeholder="Name"
          />
          <p className="error">
            {errors.name && <span className="error__show">{errors.name.message}</span>}
          </p>
        </div>
        <div className="profile__element">
          <input
            className="profile__input"
            type="text"
            {...register('login', makeValidationObj(LOGIN_MIN_LENGTH, emailPattern, emailErrMsg))}
            placeholder="E-mail"
          />
          <p className="error">
            {errors.login && <span className="error__show">{errors.login.message}</span>}
          </p>
        </div>
        <div className="profile__element">
          <input
            className="profile__input"
            type="password"
            {...register('password', makeValidationObj(PASSWORD_MIN_LENGTH))}
            placeholder="Password"
          />
          <p className="error">
            {errors.password && <span className="error__show">{errors.password.message}</span>}
          </p>
        </div>
        <IconButton aria-label="delete" onClick={open}>
          <DeleteIcon />
        </IconButton>
        <button className="profile__submit" disabled={!showSubmitBtn}>
          Submit
        </button>
      </form>
      <ToastContainer />
      <div>
        {isModalOpen && (
          <Modal
            isModalOpen={isModalOpen}
            text={modalType}
            handleClick={(value) => handleClick(value)}
          />
        )}
      </div>
    </div>
  );
};
