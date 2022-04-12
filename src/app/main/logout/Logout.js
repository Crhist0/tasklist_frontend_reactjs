import { useDispatch } from 'react-redux';

import { userLoggedOut } from 'app/auth/store/userSlice';
import { useEffect } from 'react';
import { navbarCloseFolded } from 'app/store/fuse/navbarSlice';

function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLoggedOut());
    dispatch(navbarCloseFolded());
  }, []);

  // History.push('/login');

  return <></>;
}

export default Logout;
