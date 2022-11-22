import { IUser, IUserLogin, IUserUpdate } from '@/data/models';
import { useUserSignIn, useUserSignUp } from '@/hooks';
import { useAuthUser } from '@/hooks/useAuthUser';
import { AuthService } from '@/services/api/AuthService';
import { useQueryClient } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Auth, ResponseError } from '../../../types';
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
  const userRegister = useUserSignUp();
  const userLogin = useUserSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<IUserUpdate, '_id'>>({
    defaultValues: defaultFields,
  });

  const [showSubmitBtn, setShowSubmitButton] = useState(false);

  // const navigate = useNavigate();
  // const queryClient = useQueryClient();
  // const authUser = queryClient.getQueryData(['authUser']);

  // useEffect(() => {
  //   if (authUser) {
  //     navigate('/');
  //   }
  // }, [authUser, navigate]);
  const authUserObj = useAuthUser();
  const navigate = useNavigate();
  const loginUser = async (user: IUserLogin) => {
    return await userLogin.mutateAsync(user);
  };

  const registerUser = async (user: Omit<IUserUpdate, '_id'>) => {
    return await userRegister.mutateAsync(user);
  };

  const onSubmit: SubmitHandler<Omit<IUserUpdate, '_id'>> = async (data) => {
    if (formType === Auth.Login) {
      setShowSubmitButton(true);

      try {
        await toast.promise(loginUser(data), {
          pending: 'Trying to login...',
          success: 'Success!',
          error: 'Authorization error...',
        });
        authUserObj.refetch();
        navigate('/');
      } catch (error) {
        setShowSubmitButton(false);
      }
    }
    if (formType === Auth.Register) {
      setShowSubmitButton(true);
      try {
        await toast.promise<IUser, ResponseError, unknown>(registerUser(data), {
          pending: 'Trying to register...',
          success: 'Success!',
          error: {
            render({ data }) {
              return `${data?.message}`;
            },
          },
        });
        await toast.promise(loginUser(data), {
          pending: 'Trying to login...',
          success: 'Success!',
          error: 'Authorization error...',
        });
        authUserObj.refetch();
        navigate('/');
      } catch (error) {
        setShowSubmitButton(false);
      }
    }
  };
  if (formType === Auth.Logout) {
    AuthService.logOutUser();
    authUserObj.refetch();
    navigate('/');
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
        <button className="auth__submit" disabled={showSubmitBtn}>
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};
