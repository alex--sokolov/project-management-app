import './Authorization.scss';

import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ToastContainer } from 'react-toastify';
import { useUserSignIn, useUserSignUp } from '@/hooks';
import { UserLogin, UserUpdate } from '@/data/models';

import { LocalStorageService } from '@/services/localStorage';
import {
  makeValidationObj,
  defaultRegisterFields,
  emailErrMsg,
  emailPattern,
  onlyWordsErrMsg,
  onlyWordsPattern,
} from '@/services/validate';

import { Auth } from '@/types';

import { LOGIN_MIN_LENGTH, NAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from '@/configs/forms';
import { userLoggedOut } from '@/services/toasts/toasts';
import { TIME_AUTO_CLOSE, TIME_LOGOUT_DELAY } from '@/configs/toasts';

export const Authorization: FC<{ formType: Auth }> = ({ formType }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (formType === Auth.Logout) {
      userLoggedOut();
      LocalStorageService.logOutUser();
      setTimeout(() => {
        navigate(-1);
      }, TIME_AUTO_CLOSE + TIME_LOGOUT_DELAY);
    }
  }, [formType, navigate]);

  const userRegister = useUserSignUp();

  const [showSubmitBtn, setShowSubmitButton] = useState(true);

  const submitButtonHandler = () => {
    setShowSubmitButton(true);
  };

  const userLogin = useUserSignIn(submitButtonHandler);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<UserUpdate, '_id'>>({
    defaultValues: defaultRegisterFields,
  });

  const loginUser = async (user: UserLogin) => {
    userLogin.mutate(user);
  };

  const registerUser = async (user: Omit<UserUpdate, '_id'>) => {
    return await userRegister.mutateAsync(user);
  };

  const onSubmit: SubmitHandler<Omit<UserUpdate, '_id'>> = async (data) => {
    if (formType === Auth.Login) {
      setShowSubmitButton(false);
      await loginUser(data);
    }
    if (formType === Auth.Register) {
      setShowSubmitButton(false);
      try {
        await registerUser(data);
        await loginUser(data);
      } catch (error) {
        setShowSubmitButton(true);
      }
    }
  };

  return (
    <>
      {formType !== Auth.Logout ? (
        <div className="auth">
          <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
            {formType === Auth.Register && (
              <div className="auth__element">
                <input
                  className="auth__input"
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
            )}
            <div className="auth__element">
              <input
                className="auth__input"
                type="text"
                {...register(
                  'login',
                  makeValidationObj(LOGIN_MIN_LENGTH, emailPattern, emailErrMsg)
                )}
                placeholder="E-mail"
              />
              <p className="error">
                {errors.login && <span className="error__show">{errors.login.message}</span>}
              </p>
            </div>
            <div className="auth__element">
              <input
                className="auth__input"
                type="password"
                {...register('password', makeValidationObj(PASSWORD_MIN_LENGTH))}
                placeholder="Password"
              />
              <p className="error">
                {errors.password && <span className="error__show">{errors.password.message}</span>}
              </p>
            </div>
            <button className="auth__submit" disabled={!showSubmitBtn}>
              Submit
            </button>
          </form>
          <ToastContainer />
        </div>
      ) : (
        <>
          <h2 style={{ textAlign: 'center' }}>
            <i>Logging out in progress...</i>
          </h2>
          <h1 style={{ textAlign: 'center', color: 'dodgerblue' }}>Thank you for being with us!</h1>
          <ToastContainer />
        </>
      )}
    </>
  );
};
