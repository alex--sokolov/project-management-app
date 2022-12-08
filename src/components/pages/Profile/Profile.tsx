import './Profile.scss';

import { FC, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { SubmitHandler, useForm, Controller } from 'react-hook-form';

import { useModal, useUserDelete, useUserUpdate } from '@/hooks';

import { User, UserUpdate } from '@/data/models';

import {
  makeValidationObj,
  emailErrMsg,
  emailPattern,
  onlyWordsErrMsg,
  onlyWordsPattern,
} from '@/services/validate';

import { LOGIN_MIN_LENGTH, NAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from '@/configs/forms';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from '@/services/modals';
import Button from '@mui/material/Button';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { sleep } from '@/utils/sleep';
import { useTranslation } from 'react-i18next';

export const Profile: FC = () => {
  const { t } = useTranslation();

  const user = useOutletContext<User>();
  const [userName, setUserName] = useState(user.name);
  const [userLogin, setUserLogin] = useState(user.login);
  const [userPassword, setUserPassword] = useState('');

  const submitBtn = useRef<HTMLButtonElement>(null);

  const { isModalOpen, close, open } = useModal();
  const modalType = 'Do you want to delete the user?';

  const userUpdate = useUserUpdate();
  const userDelete = useUserDelete();

  const editUser = async (user: UserUpdate) => {
    return userUpdate.mutateAsync(user);
  };

  const deleteUser = () => {
    userDelete.mutate(user._id);
  };

  const onUpdate: SubmitHandler<UserUpdate> = async (data) => {
    data._id = user._id;
    await editUser(data);
    await sleep(TIME_AUTO_CLOSE);
  };

  const onDelete = (value: string) => {
    if (value === 'yes') {
      deleteUser();
    }
    close();
    return value;
  };

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm<UserUpdate>({
    defaultValues: {
      name: user.name,
      login: user.login,
      password: '',
    },
    mode: 'onChange',
  });

  return (
    <div className="profile">
      <h4 style={{ textAlign: 'center', color: 'dodgerblue' }}>{t('profile.title')}</h4>
      {user ? (
        <form onSubmit={handleSubmit(onUpdate)} className="profile__form">
          <div className="profile__element">
            <label htmlFor="name">{t('profile.user-name')}:</label>
            <Controller
              control={control}
              name={'name'}
              rules={makeValidationObj(NAME_MIN_LENGTH, onlyWordsPattern, onlyWordsErrMsg)}
              render={({ field: { onChange, name } }) => (
                <input
                  type="text"
                  className="profile__input"
                  value={userName}
                  onChange={(e) => {
                    const value = e.target.value;
                    onChange({ target: { name, value: value } });
                    setUserName(value);
                  }}
                />
              )}
            />
            <p className="error">
              {errors.name && <span className="error__show">{errors.name.message}</span>}
            </p>
          </div>
          <div className="profile__element">
            <label htmlFor="login">{t('profile.user-login')}:</label>
            <Controller
              control={control}
              name={'login'}
              rules={makeValidationObj(LOGIN_MIN_LENGTH, emailPattern, emailErrMsg)}
              render={({ field: { onChange, name } }) => (
                <input
                  type="text"
                  className="profile__input"
                  value={userLogin}
                  onChange={(e) => {
                    const value = e.target.value;
                    onChange({ target: { name, value: value } });
                    setUserLogin(value);
                  }}
                />
              )}
            />
            <p className="error">
              {errors.login && <span className="error__show">{errors.login.message}</span>}
            </p>
          </div>
          <div className="profile__element">
            <label htmlFor="password">{t('profile.user-password')}:</label>
            <Controller
              control={control}
              name={'password'}
              rules={makeValidationObj(PASSWORD_MIN_LENGTH)}
              render={({ field: { onChange, name } }) => (
                <input
                  type="password"
                  className="profile__input"
                  value={userPassword}
                  onChange={(e) => {
                    const value = e.target.value;
                    onChange({ target: { name, value: value } });
                    setUserPassword(value);
                  }}
                />
              )}
            />
            <p className="error">
              {errors.password && <span className="error__show">{errors.password.message}</span>}
            </p>
          </div>
          <IconButton aria-label="delete" onClick={open}>
            <DeleteIcon />
          </IconButton>
          <Button
            ref={submitBtn}
            variant="contained"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            {t('profile.update-btn')}
          </Button>
        </form>
      ) : (
        <></>
      )}
      <div>
        {isModalOpen && (
          <Modal
            isModalOpen={isModalOpen}
            text={modalType}
            handleClick={(value) => onDelete(value)}
          />
        )}
      </div>
    </div>
  );
};
