import { IUserLogin, IUserUpdate } from '@/data/models';
import { useUserSignIn, useUserSignUp } from '@/hooks';
import { useAuthUser } from '@/hooks/useAuthUser';
import { AuthService } from '@/services/api/AuthService';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Auth } from '../../../types';

import './Authorization.scss';

const defaultFields = {
  name: '',
  login: '',
  password: '',
};

const onlyWordsPattern = /^[a-zа-я\d]+$/i;
const onlyWordsErrMsg = 'you must use only letters and digits';
const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
const emailErrMsg = 'invalid e-mail';

const makeValidationObj = (minLength: number, pattern?: RegExp, emailErrMsg?: string) => {
  return {
    required: 'this field is required',
    minLength: {
      value: minLength,
      message: `you must enter at least ${minLength} letters`,
    },
    pattern: pattern
      ? {
          value: pattern,
          message: emailErrMsg ?? '',
        }
      : undefined,
  };
};

export const Authorization: FC<{ formType: Auth }> = ({ formType }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (formType === Auth.Logout) {
      navigate('/');
    }
  }, [formType, navigate]);

  const userRegister = useUserSignUp();

  const [showSubmitBtn, setShowSubmitButton] = useState(true);

  const submitButtonHandler = () => {
    setShowSubmitButton(true);
  };

  const userLogin = useUserSignIn(submitButtonHandler);

  const authUserObj = useAuthUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<IUserUpdate, '_id'>>({
    defaultValues: defaultFields,
  });

  const loginUser = async (user: IUserLogin) => {
    userLogin.mutate(user);
  };

  const registerUser = async (user: Omit<IUserUpdate, '_id'>) => {
    return await userRegister.mutateAsync(user);
  };

  const onSubmit: SubmitHandler<Omit<IUserUpdate, '_id'>> = async (data) => {
    if (formType === Auth.Login) {
      setShowSubmitButton(false);
      loginUser(data);
    }
    if (formType === Auth.Register) {
      setShowSubmitButton(false);
      try {
        await registerUser(data);
        loginUser(data);
      } catch (error) {
        setShowSubmitButton(true);
      }
    }
  };

  if (formType === Auth.Logout) {
    AuthService.logOutUser();
    authUserObj.refetch();
    return null;
  }

  return (
    <div className="auth">
      <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
        {formType === Auth.Register && (
          <div className="auth__element">
            <input
              className="auth__input"
              type="text"
              {...register('name', makeValidationObj(2, onlyWordsPattern, onlyWordsErrMsg))}
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
            {...register('login', makeValidationObj(0, emailPattern, emailErrMsg))}
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
            {...register('password', makeValidationObj(4))}
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
  );
};
