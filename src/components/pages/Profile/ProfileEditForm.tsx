import './ProfileEditForm.scss';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  emailErrMsg,
  emailPattern,
  makeValidationObj,
  onlyWordsErrMsg,
  onlyWordsPattern,
} from '@/services/validate';
import { LOGIN_MIN_LENGTH, NAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from '@/configs/forms';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { User, UserUpdate } from '@/data/models';
import { useUserUpdate } from '@/hooks';
import { sleep } from '@/utils/sleep';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { TextField } from '@mui/material';

const defaultColumnFields = {
  title: '',
  order: 0,
};

export const ProfileEditForm = ({ user, handleClose }: { user: User; handleClose: () => void }) => {
  const { t } = useTranslation();
  const [userName, setUserName] = useState(user.name);
  const [userLogin, setUserLogin] = useState(user.login);
  const [userPassword, setUserPassword] = useState('');

  const submitBtn = useRef<HTMLButtonElement>(null);

  const editUser = async (user: UserUpdate) => {
    return userUpdate.mutateAsync(user);
  };

  const userUpdate = useUserUpdate();

  const onUpdate: SubmitHandler<UserUpdate> = async (data) => {
    data._id = user._id;
    await editUser(data);
    await sleep(TIME_AUTO_CLOSE);
    handleClose();
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
    <form onSubmit={handleSubmit(onUpdate)} className="profile__form">
      <div className="profile__element">
        <Controller
          control={control}
          name={'name'}
          rules={makeValidationObj(NAME_MIN_LENGTH, onlyWordsPattern, onlyWordsErrMsg)}
          render={({ field: { onChange, name } }) => (
            <TextField
              error={!!errors.name}
              label={t('profile.user-name')}
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
        <Controller
          control={control}
          name={'login'}
          rules={makeValidationObj(LOGIN_MIN_LENGTH, emailPattern, emailErrMsg)}
          render={({ field: { onChange, name } }) => (
            <TextField
              error={!!errors.login}
              label={t('profile.user-login')}
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
        <Controller
          control={control}
          name={'password'}
          rules={makeValidationObj(PASSWORD_MIN_LENGTH)}
          render={({ field: { onChange, name } }) => (
            <TextField
              type="password"
              error={!!errors.login}
              label={t('profile.user-password')}
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
      <Button ref={submitBtn} variant="contained" type="submit" disabled={isSubmitting || !isValid}>
        {t('profile.update-btn')}
      </Button>
    </form>
  );
};
