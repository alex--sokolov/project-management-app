import { useUsers } from '../../../hooks/useUsers';
import { IUser, IUserUpdate } from '../../../data/models';
import { AxiosError } from 'axios';
import Button from '@mui/material/Button';
import { useUser } from '../../../hooks/useUser';
import { useState } from 'react';
import { useUserUpdate } from '../../../hooks/useUserUpdate';
import { useUserDelete } from '../../../hooks/useUserDelete';

const userInfo: IUserUpdate = {
  _id: '6370327d3c2bcb29c5b2cad3',
  name: 'Ilon Mask Updated2',
  login: 'IMask',
  password: 'someNewPassword',
};

export const NotFound = () => {
  // Example how to get all users
  const { isLoading, data, isError, error } = useUsers();

  // console.log('isError', isError);
  // console.log('isLoading', isLoading);
  // console.log('users', data);
  // console.log('data.code', data?.code);
  // console.log('data.status', data?.response?.status);

  // Example how to get user by id with button click
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const user = useUser(userId);
  const onHandleGetById = async (id: string) => {
    setUserId(id);
  };

  // Example how to update user by id with button click
  const userUpdate = useUserUpdate();
  const onHandleUpdate = async (user: IUserUpdate) => {
    await userUpdate.mutateAsync(user);
  };

  // Example how to delete user by id with button click
  const userDelete = useUserDelete();
  const onHandleDelete = async (id: string) => {
    await userDelete.mutateAsync(id);
  };

  return (
    <>
      <div>Not found</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div style={{ border: '1px solid #ccc', margin: '25px' }}>
            {!isError ? (
              <>
                <strong>users:</strong>
                <br />

                {data.map((user: IUser) => {
                  return (
                    <div key={user._id}>
                      <b>id:</b> {user._id} / <b>name:</b> {user.name} / <b>login:</b> {user.login}
                    </div>
                  );
                })}
                <strong style={{ color: 'darkgreen' }}>{JSON.stringify(data, null, 4)}</strong>
              </>
            ) : (
              <>
                <strong>error:</strong>
                <br />
                <i>status:</i>{' '}
                <strong style={{ color: 'darkred' }}>
                  {(error as AxiosError)?.response?.status}
                </strong>
                <br />
                <i>message:</i>{' '}
                <strong style={{ color: 'darkred' }}>{(error as AxiosError)?.message}</strong>
                <br />
                <strong>data:</strong>
                <br />
                {JSON.stringify(error, null, 2)}
              </>
            )}
          </div>
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Button variant="contained" onClick={() => onHandleGetById(userInfo._id)}>
          Get by Id
        </Button>
        <Button variant="contained" onClick={() => onHandleUpdate(userInfo)}>
          Update user
        </Button>
        <Button variant="contained" onClick={() => onHandleDelete(userInfo._id)}>
          DeleteUser
        </Button>
        <Button variant="contained">Register new user</Button>
      </div>
      <div>
        <b>Get user by id:</b>
      </div>
      {user ? user.data?.name : 'nothing'}
      <div>
        <b>Update user:</b>
      </div>
      {userUpdate.user ? userUpdate.user?.name : 'nothing'}
      <div>
        <b>After delete:</b>
      </div>
      {userDelete.user ? userDelete.user?.name : 'nothing'}
    </>
  );
};
