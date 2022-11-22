import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const auth = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2E0NTZiM2MyYmNiMjljNWIyY2Q3MyIsImxvZ2luIjoiSWxvbiIsImlhdCI6MTY2ODk1NzU3NCwiZXhwIjoxNjY5MDAwNzc0fQ.IhXlXrRFPe1mPynGjZ0TNnrKkYmSf2VeJ_L1W1Ojahk',
  };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
