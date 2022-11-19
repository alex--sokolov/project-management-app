import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Auth, userData } from '../../../types';
import './Authorization.scss';

const defaultFields = {
  name: '',
  login: '',
  mail: '',
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
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm<userData>({
    defaultValues: defaultFields,
  });

  const onSubmit: SubmitHandler<userData> = (data) => {
    if (formType === Auth.Login) console.log('login');
    if (formType === Auth.Register) console.log('Register');

    console.log(data);
  };

  return (
    <div className="auth">
      <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
        {formType === Auth.Register && (
          <>
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
            <div className="auth__element">
              <input
                className="auth__input"
                type="text"
                {...register('mail', makeValidationObj(4, emailPattern, emailErrMsg))}
                placeholder="E-mail"
              />
              <p className="error">
                {errors.mail && <span className="error__show">{errors.mail.message}</span>}
              </p>
            </div>
          </>
        )}

        <div className="auth__element">
          <input
            className="auth__input"
            type="text"
            {...register('login', makeValidationObj(4, onlyWordsPattern, onlyWordsErrMsg))}
            placeholder="Login"
          />
          <p className="error">
            {errors.login && <span className="error__show">{errors.login.message}</span>}
          </p>
        </div>
        <div className="auth__element">
          <input
            className="auth__input"
            type="password"
            {...register('password', makeValidationObj(8))}
            placeholder="Password"
          />
          <p className="error">
            {errors.password && <span className="error__show">{errors.password.message}</span>}
          </p>
        </div>
        <button className="auth__submit">Submit</button>
      </form>
    </div>
  );
};
