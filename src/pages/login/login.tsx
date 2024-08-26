import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { getError, getUser, signIn } from '../../services/slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  debugger;
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(() => localStorage.getItem('email') ?? '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.setItem('email', email);
  }, [email]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await dispatch(signIn({ email, password }));
    debugger;
    navigate(location.state.from.pathname);
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
